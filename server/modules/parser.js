class Parser {
    parseResults(results, survey) {

        this.data = survey;
        this.res = results;
        let tempResults = results.slice();


        if (results.length <= 1) {
            var temp = {};
            for (var key in results[0]) {
                temp[key] = [].concat(results[0][key])
            }
            results = temp;
        }

        else {


            results = results.reduce((item, val) => {

                for (let key in val) {
                    item[key] = [].concat(item[key]).concat(val[key]).filter(v => v === false || v);
                }

                return item;

            }, {});
        }

        const questions = survey.pages.reduce((prev, curr) => {
            return prev.concat(curr.elements)
        }, []);

        const counts = tempResults.reduce((item, val) => {

            for (let key in val) {
                let add = val[key] ? 1 : 0;
                item[key] = item[key] === undefined ? add : item[key] + add;
            }

            return item;

        }, {});


        const getQuestion = (name) => {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].name === name) {
                    return questions[i];
                }
            }

            return null;
        };


        results = Object
            .entries(results)
            // .filter(item => item[0] !== 'HappendAt' )
            .map(function (item, i) {

                if (item[0] == 'HappendAt') {
                    this.dateSubmitted = item[1].reduce((a, b) => new Date(a) > new Date(b) ? a : b);
                    return null;
                }


                let groups = item[1].sort().reduce(function (prev, curr) {
                    if (prev.length && curr === prev[prev.length - 1][0]) {
                        prev[prev.length - 1].push(curr);
                    }
                    else {
                        prev.push([curr]);
                    }
                    return prev;
                }, []);


                var obj = {};
                for (var i = 0; i < groups.length; i++) {
                    obj[groups[i][0]] = groups[i].length;
                }

                let q = getQuestion(item[0]);

                if (q.choices) {

                    obj = q.choices.reduce((prev1, curr1) => {
                        if (!prev1[curr1]) {
                            prev1[curr1] = 0;
                        }
                        return prev1;
                    }, obj)
                }
                else if (q.type === 'boolean') {
                    obj = {
                        'Yes': obj['true'],
                        'No': obj['false'],

                    }
                }

                return {
                    name: item[0],
                    results: obj,
                    type: q.type,
                    numAnswered: counts[item[0]]
                };
            }, this);


        return {
            data: results.filter(v => v == false || v),
            dateSubmitted: this.dateSubmitted
        }

    }

}


module.exports = new Parser;