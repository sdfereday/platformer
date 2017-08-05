let Analyser = (superclass) => class extends superclass {
    
    // https://bitbucket.org/drunkenoodle/rpg-turn-based-proto/src/b98fbc1356938739acf0ef77b47502847f8d5652/src/data/definitions.js?at=master&fileviewer=file-view-default
    analyse(gambits, status, target) {

        /// Remember it's just 1 on 1 right now, so target picking is a bit redundant. However,
        /// it might decide to pick its self.
        // Gets the list of gambit nodes to return from analyses
        let defaultAction = gambits.find(x => x.isDefault);
        let gambitTest = gambits.find(function (node) {
            return this.conditionRunner(node, status);
        }, this);

        return gambitTest ? gambitTest.actionIfTrue : defaultAction.actionIfTrue; // What happens if non-true ? Perform default?

    };

    conditionRunner(condition, data) {

        // For each condition, run the stats against it.
        let status = data[condition.identifier];
        // If against specific static value not specified, we just revert to the actual condition value (things like distance use this).
        let againstStatus = condition.against ? data[condition.against] : condition.value;
        // This needs to be true for this gambit to pass.
        let allTrue = false;

        // Some type checking would be useful here too.
        switch (condition.operator) {
            case 'boolean':
                allTrue = status === condition.value;
                break;
            case 'less_than':
                allTrue = condition.value > 0 && condition.percentile ? status < (againstStatus * condition.value) : status < againstStatus;
                break;
            case 'greater_than':
                allTrue = condition.value > 0 && condition.percentile ? status > (againstStatus * condition.value) : status > againstStatus;
                break;
            case 'equal_to':
                allTrue = condition.value === status;
                break;
            case 'not_equal_to':
                allTrue = condition.value !== status;
                break;
        }

        if (condition.and && condition.and.length > 0) {

            return condition.and.every(function (subcondition) {
                return this.conditionRunner(subcondition, data);
            }, this) && allTrue;

        }

        if (condition.or && condition.or.length > 0) {

            return condition.and.every(function (subcondition) {
                return this.conditionRunner(subcondition, data);
            }, this) || allTrue;

        }

        return allTrue;

    };

}

export default Analyser;