function add_new_block(){
    let count=document.getElementById('inp_place_con').childElementCount+1;
   // console.log(count);
    if(count>8) alert("Can't add more than 8 cells");
    else{    
        let new_field=document.createElement('div');
        new_field.innerHTML = document.getElementById('main').innerHTML;
        new_field.id = "main";
        document.getElementById('inp_place_con').appendChild(new_field);
    }
} 
function get_val(){
    let list=document.getElementsByTagName("input");
    let len=list.length;
    var arr=[]
    //console.log(len);   
    for(let i=0;i<len;i++){
        if(list[i].value!=""){    
            arr.push(list[i].value);
        }
    }
    //console.log("get_val",arr);
    return arr;
}
function get_cood(str){
    var tup=[null,null];
    let x=0,y=0;
    if(str[0]=='('){
        x=1;
    }
    if(str[str.length-1]==')') y=1;
    str = str.slice(x,str.length-y); 
    //console.log("str->",str);
    if(str.includes(','))  {
        tup =str.split(',').map(i =>Number(i));
    }
    else {
        alert('Invalid Syntax');
    }
    return tup;
}
function submit(){
    arr=get_val();
    num_arr=[];
    for( i=0;i<arr.length;i++){
        // console.log("init",get_cood(arr[i]));
        num_arr.push(get_cood(arr[i]));
    }
    passVal(num_arr);
    // console.log(num_arr[0][0],num_arr[0][1]);
    // console.log(num_arr[1][0],num_arr[1][1]);
}
function checkStline(num_arr) {
	let m=null;
	let c=null;
	// console.log(num_arr.length);
	if(num_arr.length>1){
		check=true;
		x1=num_arr[0][0];
		y1=num_arr[0][1];
		x2=num_arr[1][0];
		y2=num_arr[1][1];
		m=(y2-y1)/(x2-x1);
		c=(x2*y1-x1*y2)/(x2-x1);
		for(i=2;i<num_arr.length;i++){
			if (num_arr[i][0]*m+c!=num_arr[i][1]){
				check = false;
				m=null;
				c=null;
				break;
			}
		}
		if(check) return [m,c];
	}
	return [m,c];
}
function passVal(num_arr) {
//     console.log("numarr",num_arr);
    let mcar=checkStline(num_arr);
    let m=mcar[0],c=mcar[1];
    var layout = {
        title:'Plot',
        showlegend: false,
    };
    var trace = {
        x: [],
        y: [],
        type: 'line',
        connectgaps: false,
        
    };
//     console.log("m c",m,c);
    if (m!=null && c!= null){
        trace.x.push(0);
        trace.y.push(c);
        if(c!=0){
            trace.x.push(-c/m);
            trace.y.push(0);
        }
//         console.log("hd",toString(m));
        let mcarVis=document.getElementById('mcarid').style.visibility='visible';
        let equation=document.getElementById("Eq");
        equation.innerHTML="Y = ("+m.toString(10)+") * X + "+"("+c.toString(10)+")";
    }
    else if(m==null&&c==null){
        let mcarVis=document.getElementById('mcarid').style.visibility='hidden';
    }
    for(let i=0;i<num_arr.length;i++){
        trace.x.push(num_arr[i][0]);
        trace.y.push(num_arr[i][1]);
    }
//     console.log(trace);
    Plotly.newPlot('graphArea', [trace],layout,{scrollZoom: true,
        displayModeBar: true,modeBarButtonsToRemove: ['zoom2d'],displaylogo: false,responsive: true,selected:'pan2d',responsive:true});
}
