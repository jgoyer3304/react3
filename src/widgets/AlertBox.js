import React from 'react';
import {Status} from './saveStatus';

export function AlertBox({status}) {
    if (status === Status.FAILURE) {
        return <div>Save failed</div>;
    } else if (status === Status.SUCCESS) {
        return <div>Save succeeded</div>;
    } else if (status === Status.WAITING) {
        return <div>Saving...</div>;
    } else {
        return null;
    }
}