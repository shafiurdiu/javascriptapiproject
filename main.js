
var loader = document.getElementById("loading");
var infocard = document.getElementById("infocard");

function hide(){
    loader.style.visibility = "hidden";
    infocard.style.visibility = "hidden";

}



function searchresult(){
    loader.style.visibility = "visible";
    confiq = {
        method: "get",
        url: "https://jsonplaceholder.typicode.com/users",
    };
    var promiseobj = axios(confiq);
    promiseobj.then((res) => {
        return res.data;

    }).then(searchbox)
    .catch(err => {
      console.log('Error: ', err);
    })
}

function searchbox(data){
    loader.style.visibility = "hidden";
    var input, filter1;
    input = document.getElementById("searchBox");
    var resultlist = document.getElementById("results");
    if (resultlist.hasChildNodes()){
        console.log("Yes");
        for (let i=0; resultlist.childNodes.length; i++){
            resultlist.removeChild(resultlist.childNodes[i]);
        }
    }
    filter1 = input.value;

    if (filter1.length == 0){
        infocard.style.visibility = "hidden";
    }

    if (filter1.length >= 1){
        for(var i=0; i<data.length; i++){
            fname = data[i].name.toLowerCase();
            console.log(data[i].name, filter1, data[i].name.includes(filter1));
            if (fname.includes(filter1.toLowerCase())){
                
    
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
                header_area.innerText = data[i].name;
                header_area.setAttribute("id",data[i].id);
                header_area.setAttribute("onclick","selectuser(this.id)");
            }
        }
    }

}

function selectuser(selectID){

    

    infocard.style.visibility  = "visible";
    loader.style.visibility = "visible";


    let pinfo = document.getElementById("pinfo");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");
    let company = document.getElementById("company");
    let companylink = document.getElementById("companylink");

    config = {
        method: "get",
        url: `https://jsonplaceholder.typicode.com/users/${selectID}`,
    };
    const promiseobj = axios(config);
    promiseobj.then((res) => {
        loader.style.visibility = "hidden";
        let singleData = res.data;
        // createList(alldata);
        pinfo.innerHTML = "Full Name: " + singleData.name + "<br>"+ "Username: " +singleData.username + "<br>" + "Email: " +singleData.email;
        phone.innerHTML = "Phone: " + singleData.phone;
        company.innerHTML = "Company: " + singleData.company.name;
        companylink.href = "https://" + singleData.website;
        companylink.innerHTML = singleData.website;
        address.innerHTML = "Address: " + singleData.address.city + ", "+ singleData.address.street + ", "+ singleData.address.zipcode;
    });
}