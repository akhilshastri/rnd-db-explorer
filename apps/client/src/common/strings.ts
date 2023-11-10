interface String {
    toProperCase(): string;
    bool(): boolean;
    padZero(length: number): string;
    toCamelCase(): string;
    toTitleCase(): string;
}

String.prototype.toProperCase = function (): string {
    return this.toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase())
}

String.prototype.bool = function (): boolean {
    return this.toLowerCase() == 'true';
};

// Simple title() function for strings
String.prototype.toTitleCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


String.prototype.padZero = function (this : string, length: number) {
    let s = this;
    while (s.length < length) {
        s = '0' + s;
    }
    return s;
};

String.prototype.toCamelCase = function(): string {
    return this.replace(/(?:^\w|[A-Z]|-|\b\w)/g,
        (ltr, idx) => idx === 0
            ? ltr.toLowerCase()
            : ltr.toUpperCase()
    ).replace(/\s+|-/g, '');
};
