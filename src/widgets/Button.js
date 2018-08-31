import React from 'react';

export function Button({value, label, onClick}) {
    return (
        <button onClick={onClick} value={value}>
            {label}
        </button>
    );
}