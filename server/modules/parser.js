class Parser {
    parseResults(results, survey) {

        this.data = survey;

        const questions = survey.pages.reduce((prev, curr) => {
            return prev.concat(curr.elements)
        }, []);


        // this.res = results = results.filter(item => {

        //     const currentCount = Object.keys(item).length;
        //
        //     const globalCount = questions.length;
        //
        //     return currentCount === globalCount
        // });


        this.res = results = results.reduce((res, item) => {

            item = Object.entries(item).reduce((all, entry) => { //handle question{num}-Comment situations
                key = entry[0].split('-')[0];

                if (entry[0].indexOf('Comment') > -1) {
                    entry[1] = 'other: ' + entry[1];
                    let i = all[key].indexOf('other');
                    if (i > -1)
                        all[key].splice(i, 1);
                }

                if (Array.isArray(all[key])) {
                    all[key].push(entry[1]);
                }
                else {
                    all[key] = entry[1];
                }

                return all;
            }, {});

            res.unshift(item);
            return res;

        }, []);

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
                        'Yes': obj['true'] || 0,
                        'No': obj['false'] || 0,

                    }
                }

                return {
                    name: item[0],
                    results: obj,
                    title: q.title,
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