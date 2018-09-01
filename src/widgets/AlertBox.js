import React from 'react';
import {Status} from './Status';

export function AlertBox({status}) {
    if (status === Status.FAILURE) {
        return <div>Transaction failed -- unspecified</div>;
    } if (status === Status.FAILURE_LIMIT) {
        return <div>Transaction failed -- daily limit exceeded</div>;
    } if (status === Status.LOGIN_FAILED) {
        return <div>Login failed -- invalid pin</div>;
    } else if (status === Status.SUCCESS) {
        return <div>Transcation succeeded</div>;
    } else if (status === Status.WAITING) {
        return <div>Saving...</div>;
    } else {
        return null;
    }
}