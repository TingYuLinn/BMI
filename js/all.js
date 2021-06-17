//DOM
var list = document.querySelector('.list');
var result = document.querySelector('.result');
var resultHide = document.querySelector('.result-hide');
var del = document.querySelector('.del');
var height = document.querySelector('.input-cm');
var weight = document.querySelector('.input-kg');
var data = JSON.parse(localStorage.getItem('listData')) || [];
var status = '';

//監聽事件
result.addEventListener('click', getResult);
del.addEventListener('click',delData);
updateData(data);


//點擊按鈕計算結果
function getResult(e) {
    e.preventDefault();
    var height = document.querySelector('.input-cm').value;
    var weight = document.querySelector('.input-kg').value;
    var heightM2 = Math.pow(height / 100, 2);
    var BMI = (weight / heightM2).toFixed(2);

    if(height == '' || weight == ''){
        alert('請填寫數字！')
        return;
    }

    var status = '';
    var color = '';
    if (BMI >= 40) {
        status = '重度肥胖';
        color = '#FF1200';
    } else if (BMI >=35) {
        status = '中度肥胖';
        color = '#FF6C03';
    } else if (BMI >= 30) {
        status = '輕度肥胖';
        color = '#FF6C03';
    } else if (BMI >= 25) {
        status = '過重';
        color = '#FF982D';
    }else if (BMI >= 18.5) {
        status = '理想';
        color = '#86D73F';
    }else {
        status = '過輕';
        color = '#31BAF9';
    }

    //日期
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day  = date.getDate();
    var hours = date.getHours();
    hours = (hours < 10 ? "0" : "") + hours;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var time = year +'-'+ month +'-'+ day +'  '+ hours +':'+ min;

    var BMIList = {
        status: status,
        content: BMI,
        userWeight: weight,
        userHeight: height,
        color: color,
        Time: time
    }

    data.push(BMIList);
    updateData(data);
    localStorage.setItem('listData', JSON.stringify(data));

    //變換按鈕畫面
    result.style.display = 'none';
    resultHide.style.display = '';

    resultHide.innerHTML = '<div class="result-hide-style"'+
    'style="color:'+ BMIList.color +'; border:7px solid'+ BMIList.color +'; ">'+
    '<div class="hide-content"><div>'+BMIList.content+'</div><div style="font-size:10px;word-break: break-all">BMI</div></div>'+
    '<div class="reset-icon" style="background-color:'+ BMIList.color +';"><img src="https://i.postimg.cc/hP7htyRR/icons-loop.png"></div></div>'+
    '<div class="hide-status" style="color:'+ BMIList.color +';">'+BMIList.status+'</div>';
   
    //reset icon的功能
    var reset = document.querySelector('.reset-icon img');
    reset.addEventListener('click',function(){
    resultHide.style.display = 'none';
    result.style.display = '';
    });
}


//將計算好的資料組成list畫面
function updateData(data) {
    var today = new Date();
    var str = "";
    len = data.length;
    for (var i = 0; i < len; i++) {
        str +=
            '<li data-index="' + i + '" class="history-list" style="border-left: 7px solid'+ data[i].color +';">' +
            '<div>'+ data[i].status +'</div>'+
            '<div><span>BMI </span>' + data[i].content + '</div>' +
            '<div> <span>weight</span> '+  data[i].userWeight +' kg </div>'+
            '<div> <span>height</span> '+ data[i].userHeight +' cm </div>' +
            '<div><span>'+ data[i].Time +'</span></div>'
            '</li>'
    }
    list.innerHTML = str;

    height.value = '';
    weight.value = '';
}


//全部清除功能
function delData() {
    localStorage.removeItem('listData');
    data = [];
    updateData(data);
    return;
}