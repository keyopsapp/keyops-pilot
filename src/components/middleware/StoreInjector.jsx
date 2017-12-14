import React, {Component} from "react";
import {inject, observer} from "mobx-react";

export default function StoreInjector(Component) {
    @inject(
        'exampleStore',
        'surveyStore'
    )
    @observer
    class StoreInjectorComponent extends Component {
        render() {
            return (
                <div id="storeInjector">
                    <Component {...this.props} />
                </div>
            );
        }
    }

    return StoreInjectorComponent;
}
