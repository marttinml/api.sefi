exports.logStart = function(val){
    console.log('\n'+val.controller+'.controller > '+val.method+'()');
    console.log('············································································'+val.d);
    console.log('   D A T A B A S E');
    console.log('Document:  '+val.controller+'.'+val.method+'()');
    console.log('>>> Data Request');
    console.log(val.body);
};
exports.logEnd = function(val){
    d   = new Date()
    end = d.getMilliseconds();
    val.d = val.start - end;

    console.log('\n<<< Data Response');
    console.log(val.response);
    console.log('············································································ Time: '+val.d+' ms');
};