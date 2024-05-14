// // Rest Api    by = class
// class Countries {
//   fOpen = async (url) => {
//     let response = await fetch(url);
//     if (response.ok) return response.json();
//     else throw new Error(`Bu manzildagi ma'lumotlarga ulanaolmadik ${url}`);
//   };
//   getCountryAll = () => this.fOpen("https://restcountries.com/v3.1/all");
//   // getRegion = () => this.fOpen('https://restcountries.eu/rest/v3.1/region/{region}')
//   getCountryDetail = (name) => this.fOpen(`https://restcountries.com/v3.1/translation/${name}/`)
// }

// const countriesData = new Countries();
// // console.log(countriesData.getCountryAll())
// console.log(countriesData.getCountryDetail(name))

// function renderCountry() {
//   countriesData.getCountryAll().then((data, i) => {
//     // console.log(data)
//     let info = data.slice(0, 48);
//     const row = document.querySelector(".country");
//     info.forEach((item) => {
//     //   console.log(item);
//       countryName = item.name['common']
//       console.log(countryName)
     
//       const card = document.createElement("a");
//       const col = document.createElement("div");

//       col.classList.add("col-12", "col-md-6", "col-lg-3", "my-4");
//       // console.log(col)
//       card.classList.add("card");
//       card.setAttribute("href", "./country-inner.html");
//       card.innerHTML = `
//             <img src="${item.flags["svg"]}" class="card-img-top" alt="${item.flags["alt"]}">
//             <div class="card-body">
//               <h5 class="card-title">${item.name["common"]}</h5>
//               <p class="card-text"><span class="card-text__span">Population:</span> ${item.population}</p>
//               <p class="card-text"><span class="card-text__span">Region: </span>${item.region}</p>
//               <p class="card-text"><span class="card-text__span">Capital: </span>${item.capital}</p>
//             </div>
            
            
//             `;
           
//       col.append(card);
//       row.append(col);

//       col.addEventListener('click',function () {
//         Countries.getCountryDetail(countryName)
//       })
     
//     });
//   });
// }
// renderCountry()




// const inputText = document.querySelector('.form-select')


// inputText.addEventListener(change , function (){
    


// })
 




// try fetch api 



// api 2 ta dasturlash tilini bir biri bn boglab beradi

// XML or JSON 
const countryies = document.querySelector('.country')
const inputSearch = document.querySelector('.form-control')
const formSelect = document.querySelector('.form-select')

let countryData;

let url = "https://restcountries.com/v3.1/all ";


async function fetchCountrydata() {
  try {
    const response = await fetch(url);
    const data = await response.json()
    console.log(data)

    const countrySort =  data.sort((a,b) => {
      return a.name.common.localeCompare(b.name.common)
    })
    // console.log(countrySort)
    countryData = countrySort;
    // console.log(countrySort)
    renderCountry(countrySort)
    
  } catch (error) {
    console.log("xatolik",error)
  }


}



function renderCountry (data) {

  countryies.innerHTML = ""



  data.forEach(country => {
    // console.log(country.name)


    const col =  document.createElement("div")
    col.classList.add("col-12","col-md-6","col-lg-3","my-4")
    const cardLink = document.createElement('a')
    cardLink.classList.add('card')
    cardLink.setAttribute('href',"./country-inner.html")


    cardLink.innerHTML = `
    
    <img src="${country.flags.png}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <p class="card-text"><span class="card-text__span">Population:</span> ${country.population}</p>
            <p class="card-text"><span class="card-text__span">Region: </span>${country.region}</p>
            <p class="card-text"><span class="card-text__span">Capital: </span>${country.capital}</p>
          </div>
    `
    col.append(cardLink)

    countryies.append(col)
  });
}



//  input 

inputSearch.addEventListener('input',() => {
  
  let inputVal = inputSearch.value.toLowerCase()
  console.log(inputVal)


  let filterCountry = countryData.filter( function (country){
  return country.name.common.toLowerCase().includes(inputVal)

})
renderCountry(filterCountry)
})

// form select


formSelect.addEventListener('change',() => {
  const selectRegion = formSelect.value
  console.log(selectRegion)


  if(selectRegion === "All"){
    renderCountry(countryData)
  }else{
    const filterCountry = countryData.filter(country => country.region === selectRegion)
    renderCountry(filterCountry)
  }
})

fetchCountrydata()



