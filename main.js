

function searchresult(){
    
    confiq = {
        method: "get",
        url: "https://jsonplaceholder.typicode.com/users",
    };
    var promiseobj = axios(confiq);
    promiseobj.then((res) => {

        var getdata = res.data;
        console.log(getdata);
        searchbox(getdata);

    });
    
}

function searchbox(receivedata){
    var input, filter1;
    input = document.getElementById("searchBox");
    filter1 = input.value;
    console.log(filter1);    
    if(filter1.length <= 1){

        for(var i=0; i<receivedata.length; i++){
            var resultlist = document.getElementById("results");
    
            var item_area = document.createElement("div");
            item_area.className = "item";
    
            resultlist.appendChild(item_area);
    
            item_area.setAttribute("id","myselect");
    
            var content_area = document.createElement("div");
            content_area.className = "content";
            item_area.appendChild(content_area);
    
             
    
            var header_area = document.createElement("div");
            content_area.appendChild(header_area);
            resultlist.setAttribute("style", "display: block !important;");
            header_area.innerText = receivedata[i].name;
            header_area.setAttribute("id",receivedata[i].id);
            header_area.setAttribute("onclick","selectuser(this.id)");
        }

    }

}

function selectuser(selectID){
    console.log(selectID);

    let name = document.querySelector("#name");
    let username = document.querySelector("#username");
    let email = document.querySelector("#email");

    config = {
        method: "get",
        url: `https://jsonplaceholder.typicode.com/users/${selectID}`,
    };
    const promiseobj = axios(config);
    promiseobj.then((res) => {
        let singleData = res.data;
        console.log(singleData);
        // createList(alldata);
        name.value = singleData.name;
        username.value = singleData.username;
        email.value = singleData.email;
    });
}