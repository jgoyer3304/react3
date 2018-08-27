import React from 'react';

export function Button({value, label, onClick}) {
    return (
        <button className="f6 link dim br1 ba ph3 pv2 mb2 dib black" onClick={onClick} value={value}>
            {label}
        </button>
    );
}