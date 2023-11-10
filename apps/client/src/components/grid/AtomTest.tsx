import {atom, useAtom} from 'jotai'
import {Button} from "@mantine/core";

const countAtom = atom(0);


export const AtomTest = () => {
    const [ count, setCount ] = useAtom(countAtom);

    return (
        <div >
            {count}
            <Button onClick={_=>setCount(count +1)} >
                +
            </Button>
            <Button onClick={_=> setCount(count-1)} >
                -
            </Button>
        </div>
    );
};
