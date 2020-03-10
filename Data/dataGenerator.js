var fs = require('fs');
 
const deleteFile = ({file, isDelete}) => {
    console.log(file)
    if(isDelete){
        if (fs.existsSync(file)){
            fs.unlinkSync(file)
        } else {
            throw new Error("No such file to delete")
        }
    }
}

const filePathChecker = (filepath) => {
    let seperatedFilepath = filepath.split('/')
    seperatedFilepath.pop()
    starterFilepath = '~'

    seperatedFilepath.map(directory => {
        if(!directory==='.'){
            starterFilepath += ("/" + directory)
            if(!fs.existsSync(datasetDirectoryPath)) throw "The savepath '" + filepath + "' does not exist";
        }else{
            starterFilepath = "."
        }
    })
    return true
}

const generateStrings = ({amount, stringLength, isGetReturn, isSave, savePath}) => {
    //Default Values
    !amount ? amount=100: null;
    !stringLength ? stringLength = {len: 400, perc: 60} : null;
    !isGetReturn ? isGetReturn = false: null;
    !isSave ? isSave = true: null;
    if(!savePath) throw new Error("No savepath provided");

    isValidSavePath = filePathChecker(savePath);
    if(isValidSavePath){
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,?!";
        const charactersLength = characters.length;
        const roundedAmount = Math.ceil(amount/100) * 100;
        let dataArray;

        if(isGetReturn) dataArray = [];

        stringLength.map(item => {
            for(let i = 0 ; i < ((roundedAmount/100) * item.perc); i++){
                let dataString = '';

                for ( var j = 0; j < item.len; j++ ) {
                    dataString += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                if(isSave){
                    dataString+='\n'
                    fs.appendFile(savePath, dataString, 'utf8',
                        function(err) { 
                            if (err) throw err;
                            console.log("Data is appended to file successfully.");
                    });
                }
                
                if(isGetReturn) dataArray.push(dataString);
            }
        })

        if(isGetReturn) return dataArray;
    }
}

const datasetDirectoryPath = './Dataset/randomStrings.txt';
// deleteFile({file: datasetDirectoryPath, isDelete: true});

generateStrings({amount: 100, stringLength: [{len: 400, perc: 60},{len: 200, perc: 10},{len: 600, perc: 30}], savePath: datasetDirectoryPath});