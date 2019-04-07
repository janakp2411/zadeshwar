import _ from 'lodash';

// export const getGroupedGridData = (data) => {
//     const finalData = [];
//     const copy = _.groupBy(data.map(a => ({...a})), 'state');
//     Object.keys(copy).sort().forEach(key => {
//         let totalChildren = 0;
//         const child = _.groupBy(copy[key], 'familyPersonName');
//         var first;
//         Object.keys(child).sort().forEach(key => {
//             child[key] && child[key].forEach((data, index) => {
//                 data.id = totalChildren;
//                 if(index !== 0){
//                     delete data.familyPersonName;
//                 } else {
//                     data.hasSubChildren = child[key].length;
//                 }
//                 if(totalChildren){
//                     delete data.state;
//                 } else {
//                     first = data;
//                 }
//                 totalChildren++;
//                 finalData.push(data);
//             });
//         });
//         first.numberOfChildren = totalChildren; 
//     });
//     console.log(finalData);
//     return finalData;
// }

export const getGroupedGridData = (data) => {
    const finalData = [];
    const clone = data.map(a => ({...a}));
    const firstLevelGroup = _.groupBy(clone, 'country');
    Object.keys(firstLevelGroup).sort().reverse().forEach(k => {
        let totalSameCountry = 0;
        const copy = _.groupBy(firstLevelGroup[k], 'state');
        var firstCountry;
        Object.keys(copy).sort().forEach(key => {
            let totalChildren = 0;
            const child = _.groupBy(copy[key], 'familyPersonName');
            var first;
            Object.keys(child).sort().forEach(key => {
                child[key] && child[key].forEach((data, index) => {
                    // data.id = totalChildren;
                    if(index !== 0){
                        delete data.familyPersonName;
                    } else {
                        data.hasSubChildren = child[key].length;
                    }
                    if(totalChildren){
                        delete data.state;
                    } else {
                        first = data;
                    }
                    if(totalSameCountry){
                        delete data.country;
                    } else {
                        firstCountry = data;
                    }
                    totalChildren++;
                    totalSameCountry++;
                    finalData.push(data);
                });
            });
            first.numberOfChildren = totalChildren; 
        });
        firstCountry.numberOfSameCountry = totalSameCountry;
    })
    console.log(finalData);
    return finalData;
}

export const createShowCellRenderer = () => {
    function ShowCellRenderer() {}
    ShowCellRenderer.prototype.init = function(params) {
    var cellBlank = !params.data.numberOfChildren;
    if (cellBlank) {
        return null;
    }
    this.ui = document.createElement("div");
    this.ui.innerHTML = '<div class="show-name">' + params.data.state + "" + "</div>";
    };
    ShowCellRenderer.prototype.getGui = function() {
    return this.ui;
    };
    return ShowCellRenderer;
}


export const createCellRenderer = () => {
    function showRenderer() {}
    showRenderer.prototype.init = function(params) {
        var cellBlank = !params.data.familyPersonName;
    if (cellBlank) {
        return null;
    }
    this.ui = document.createElement("div");
    this.ui.innerHTML =
        '<div class="show-name">' + params.data.familyPersonName + "" + "</div>";
    };
    showRenderer.prototype.getGui = function() {
    return this.ui;
    };
    return showRenderer;
};

export const createCountryCellRenderer = () => {
    function showCountryCellRenderer() {}
    showCountryCellRenderer.prototype.init = function(params) {
        var cellBlank = !params.data.numberOfSameCountry;
    if (cellBlank) {
        return null;
    }
    this.ui = document.createElement("div");
    this.ui.innerHTML =
        '<div class="show-name">' + params.data.country + "" + "</div>";
    };
    showCountryCellRenderer.prototype.getGui = function() {
    return this.ui;
    };
    return showCountryCellRenderer; 
};

export const getDropDownList = (data, key) => {
    return _.uniqBy(data, key).map((uniq, index) => ({label: uniq[key].toUpperCase(), value:{id:index, name: uniq[key].toUpperCase(), code: uniq[key].toUpperCase()}}))
}