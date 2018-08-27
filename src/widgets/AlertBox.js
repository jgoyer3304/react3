import React from 'react';
import {Status} from './saveStatus';

export function AlertBox({status}) {
    if (status === Status.FAILURE) {
        return <div className="mv2">Save failed</div>;
    } else if (status === Status.SUCCESS) {
        return <div className="mv2">Save succeeded</div>;
    } else if (status === Status.WAITING) {
        return <div className="mv2">Saving...</div>;
    } else {
        return null;
    }
}