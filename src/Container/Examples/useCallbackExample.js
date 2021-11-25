import React, {useState, useCallback} from 'react'
import ListItem from './ListItem';

export default function useCallbackExample() {
    const [number, setNumber] = useState(1)
    const [dark, setDark] = useState(false)

    const getItem = useCallback((inc) => {
        return [number+inc, number+1+inc, number+2+inc]
    }, [number])

    const theme = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF' : '#333'
    }

    return(
        <div style={theme}>
        <br /><br /><br /><br />
            <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))}/>
            <input type="button" value="Change Theme" onClick={() => setDark(!dark)} />

            <ListItem getItem={getItem} />
        </div>
    )

};