const defaultMenu = [
  {category:"Nasi",name:"Nasi Goreng",price:8,available:true},
  {category:"Nasi",name:"Nasi Goreng Kampung",price:10,available:true},
  {category:"Nasi",name:"Nasi Pattaya",price:11,available:true},

  {category:"Mee",name:"Mee Goreng",price:7,available:true},
  {category:"Mee",name:"Mee Hoon Goreng",price:7,available:true},
  {category:"Mee",name:"Kuey Teow Goreng",price:8,available:true},

  {category:"Naan",name:"Naan Cheese",price:7,available:true},
  {category:"Naan",name:"Naan Garlic",price:5,available:true},

  {category:"Western",name:"Chicken Chop",price:15,available:true},
  {category:"Western",name:"Lamb Chop",price:22,available:true},

  {category:"Drinks",name:"Teh Tarik",price:3,available:true},
  {category:"Drinks",name:"Milo Ais",price:4,available:true}
];

if(!localStorage.getItem("menuResetDone")){
  localStorage.setItem(
    "menu",
    JSON.stringify(defaultMenu)
  );

  localStorage.setItem(
    "menuResetDone",
    "yes"
  );
}

let menu =
JSON.parse(
  localStorage.getItem("menu")
) || defaultMenu;

render();

function render(){

  localStorage.setItem(
    "menu",
    JSON.stringify(menu)
  );

  const search =
  document
  .getElementById("searchInput")
  .value
  .toLowerCase();

  const categoryOrder = [
    "Nasi",
    "Mee",
    "Naan",
    "Western",
    "Drinks"
  ];

  let html = "";

  categoryOrder.forEach(category=>{

    const items =
    menu.filter(item=>
      item.category===category &&
      item.name
      .toLowerCase()
      .includes(search)
    );

    if(items.length){

      html += `
      <h2 class="category-title">
        ${category.toUpperCase()}
      </h2>
      `;

      items.forEach(item=>{

        html += `
        <div class="item">

          <div class="menu-row">

            <span class="item-name">
              ${item.name}
            </span>

            <span class="item-price">
              RM ${Number(item.price).toFixed(2)}
            </span>

          </div>

          ${
            item.available
            ? ""
            : `<div class="sold-out">
                SOLD OUT
              </div>`
          }

        </div>
        `;

      });

    }

  });

  document
  .getElementById("menu")
  .innerHTML = html;

  renderAdmin();
}

function renderAdmin(){

  let html = "";

  menu.forEach((item,index)=>{

    html += `
    <div class="item">

      <select
      onchange="
      updateCategory(
      ${index},
      this.value
      )">

        <option value="Nasi"
        ${item.category==="Nasi"?"selected":""}>
        Nasi
        </option>

        <option value="Mee"
        ${item.category==="Mee"?"selected":""}>
        Mee
        </option>

        <option value="Naan"
        ${item.category==="Naan"?"selected":""}>
        Naan
        </option>

        <option value="Western"
        ${item.category==="Western"?"selected":""}>
        Western
        </option>

        <option value="Drinks"
        ${item.category==="Drinks"?"selected":""}>
        Drinks
        </option>

      </select>

      <input
      value="${item.name}"
      onchange="
      updateName(
      ${index},
      this.value
      )">

      <input
      value="${item.price}"
      onchange="
      updatePrice(
      ${index},
      this.value
      )">

      <button
      onclick="
      toggleAvailability(
      ${index}
      )">

      ${
        item.available
        ? "Available"
        : "Sold Out"
      }

      </button>

      <button
      onclick="
      deleteItem(
      ${index}
      )">

      Delete

      </button>

    </div>
    `;
  });

  document
  .getElementById("adminList")
  .innerHTML = html;
}

function addItem(){

  const category =
  document
  .getElementById("itemCategory")
  .value;

  const name =
  document
  .getElementById("itemName")
  .value;

  const price =
  document
  .getElementById("itemPrice")
  .value;

  if(name && price){

    menu.push({
      category,
      name,
      price,
      available:true
    });

    render();

    document
    .getElementById("itemName")
    .value="";

    document
    .getElementById("itemPrice")
    .value="";
  }
}

function updateCategory(i,v){
  menu[i].category=v;
  render();
}

function updateName(i,v){
  menu[i].name=v;
  render();
}

function updatePrice(i,v){
  menu[i].price=v;
  render();
}

function deleteItem(i){
  menu.splice(i,1);
  render();
}

function toggleAvailability(i){
  menu[i].available=
  !menu[i].available;
  render();
}

function showAdmin(){

  const password =
  prompt("Enter Password");

  if(password==="Mdisa001"){

    document
    .getElementById("adminPanel")
    .style.display="block";

  }else{

    alert("Wrong Password");
  }
}

function toggleDarkMode(){
  document.body
  .classList
  .toggle("dark");
}
