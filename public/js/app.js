function readFile(input,folder) {
  // let file = input;

  // let reader = new FileReader();

  // reader.readAsText(file);

  // reader.onload = function() {
  //   //console.log(reader.result);
  // };

  // reader.onerror = function() {
  //   // console.log(reader.error);
  // };


 
  //   var storageRef = firebase.storage().ref();
  //   // Create the file metadata
  // var metadata = {
  //   contentType: 'image/jpeg/png'
  // };

  // // Upload file and metadata to the object 'images/mountains.jpg'
  // var uploadTask = storageRef.child('Properties/'+folder+'/' + file.name).put(file, metadata);
  
  // // Listen for state changes, errors, and completion of the upload.
  // console.log('Uploading ....');
  // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //   (snapshot) => {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('Upload is ' + progress + '% done');
  //     switch (snapshot.state) {
  //       case firebase.storage.TaskState.PAUSED: // or 'paused'
  //         console.log('Upload is paused');
  //         break;
  //       case firebase.storage.TaskState.RUNNING: // or 'running'
  //         console.log('Uploading ....');
  //         break;
  //     }
  //   }, 
  //   (error) => {
  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     switch (error.code) {
  //       case 'storage/unauthorized':
  //         // User doesn't have permission to access the object
  //         break;
  //       case 'storage/canceled':
  //         // User canceled the upload
  //         break;
  
  //       // ...
  
  //       case 'storage/unknown':
  //         // Unknown error occurred, inspect error.serverResponse
  //         break;
  //     }
  //   }, 
  //    () => {
  //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //      console.log(downloadURL);
  //      return downloadURL;
  //     });
  // }
  // );
  




  
    

}




function filterProperties(){
  var investmentTypeArray=[];
  var investmentStrategyArray=[];
  var propertyTypeArray=[];

   if($('#openForInvestment').prop('checked')==true){
   investmentTypeArray.push('Open For Investment');     
   }
   if($('#openForPledging').prop('checked')==true){
    investmentTypeArray.push('Open For Pledging');     
   }
   if($('#waitlist').prop('checked')==true){
    investmentTypeArray.push('Waitlist');     
   }
   if($('#funded').prop('checked')==true){
    investmentTypeArray.push('Funded');     
   }

   if($('#multifamily').prop('checked')==true){
    propertyTypeArray.push('Multifamily');     
   }
   if($('#retail').prop('checked')==true){
    propertyTypeArray.push('Retail');     
   }
   if($('#office').prop('checked')==true){
    propertyTypeArray.push('Office');     
   }
   if($('#hospitality').prop('checked')==true){
    propertyTypeArray.push('Hospitality');     
   }
   if($('#industrial').prop('checked')==true){
    propertyTypeArray.push('Industrial');     
   }
   if($('#mixedUse').prop('checked')==true){
    propertyTypeArray.push('Mixed Use');     
   }
   if($('#specialPurpose').prop('checked')==true){
    propertyTypeArray.push('Special Purpose');     
   }
   if($('#all').prop('checked')==true){
    propertyTypeArray.push('All');     
   }
   if($('#land').prop('checked')==true){
    propertyTypeArray.push('Land');     
   }
   if($('#noteLoan').prop('checked')==true){
    propertyTypeArray.push('Note/Loan');     
   }

   if($('#reits').prop('checked')==true){
    investmentStrategyArray.push('REITs');     
   }
   if($('#development').prop('checked')==true){
    investmentStrategyArray.push('Development');     
   }
   if($('#value-add').prop('checked')==true){
    investmentStrategyArray.push('Value-Add');     
   }
   if($('#corePlus').prop('checked')==true){
    investmentStrategyArray.push('Core Plus');     
   }
   propertyTypeArray=JSON.stringify(propertyTypeArray)
   investmentStrategyArray=JSON.stringify(investmentStrategyArray)
   investmentTypeArray=JSON.stringify(investmentTypeArray)

   		$.ajax({
    type: 'POST',
    url: '/filterProperties',
    data:{propertyType:propertyTypeArray,
      investmentType:investmentTypeArray,
    investmentStrategy:investmentStrategyArray},
    success: function(res){ 
        if(res!='failed'){
          $('#propertiesContainer').html(res)
        }
        else{
           alert('Please check your credentials')
        }
     
    }
  });
}

function setEditProperty(property){
  sessionStorage['editProperty']=JSON.stringify(property);
  window.location.href="editProperty.html"
}
function editProperty(){
   var property=JSON.parse(sessionStorage['editProperty']);
  text='<p><label for="propertyName">Property Name</label></p> <input value="'+property.propertyName+'" required class="signinForm" id="propertyName" type="text" placeholder="Property Name"> <p><label for="offeringPrice">Offering Price</label></p> <input value="'+property.offeringPrice+'" required onkeypress="return IsNumeric(event)" class="signinForm" id="offeringPrice" type="text" placeholder="Offering Price"> <p><label for="holdPeriod">Hold Period</label></p> <input value="'+property.holdPeriod+'" required class="signinForm" id="holdPeriod" type="text" placeholder="Hold Period"> <p><label for="shortDescription">Short description</label></p> <input value="'+property.shortDescription+'" required class="signinForm" id="shortDescription" type="text" placeholder="Short Description"> <p><label for="longDescription">Long description</label></p> <input value="'+property.longDescription+'" required class="signinForm" id="longDescription" type="text" placeholder="Long Description"> <p><label for="propertyType">Property Type</label></p> <select value="'+property.propertyType+'" onchange="propertySubType()" id="propertyType"> <option value="All" selected>All</option> <option value="Retail">Retail</option> <option value="Multifamily">Multifamily</option> <option value="Office">Office</option> <option value="Industrial">Industrial</option> <option value="Hospitality">Hospitality</option> <option value="Mixed Use">Mixed Use</option> <option value="Land">Land</option> <option value="Special Purpose">Special Purpose</option> <option value="Note/Loan">Note/Loan</option> </select> <p class="propertySubType"><label for="propertySubType">Property Sub Type</label></p> <select value="'+property.propertySubType+'" id="propertySubType"></select> <p><label for="address">Address</label></p> <input value="'+property.address+'" required class="signinForm" id="address" type="text" placeholder="Address"> <p><label for="city">City</label></p> <input value="'+property.city+'" required class="signinForm" id="city" type="text" placeholder="City"> <p><label for="state">State</label></p> <input value="'+property.state+'" required class="signinForm" id="state" type="text" placeholder="State"> <p><label for="region">Region</label></p> <input value="'+property.region+'" required class="signinForm" id="region" type="text" placeholder="Region"> <p><label for="investmentOpeningDate">Investment Opening Date</label></p> <input value="'+property.investmentOpeningDate+'"required class="signinForm" id="investmentOpeningDate" type="date"> <p><label for="investmentClosingDate">Investment Closing Date</label></p> <input value="'+property.investmentClosingDate+'"required class="signinForm" id="investmentClosingDate" type="date"> <p><label for="lotSize">Lot Size</label></p> <input value="'+property.lotSize+'"required class="signinForm" id="lotSize" type="number" placeholder="1.0" step="0.01"> <p><label for="investmentStrategy">Investment Strategy</label></p> <select value="'+property.investmentStrategy+'" class="signinForm" id="investmentStrategy" > <option value="REITs">REITs</option> <option value="Development">Development</option> <option value="Value-Add">Value-Add</option> <option value="Core Plus">Core Plus</option> </select> <p><label for="investmentType">Investment Type</label></p> <select value="'+property.investmentType+'" class="signinForm" id="investmentType"> <option value="Open For Investment">Open For Investment</option> <option value="Open For Pledging">Open For Pledging</option> <option value="Waitlist">Waitlist</option> <option value="Funded">Funded</option> </select> <p><label for="targetIRR">Target IRR</label></p> <input value="'+property.targetIRR+'" required class="signinForm" id="targetIRR" type="text" placeholder="Target IRR"> <p><label for="targetARR">Target ARR</label></p> <input value="'+property.targetARR+'" required class="signinForm" id="targetARR" type="text" placeholder="Target ARR"> <p><label for="targetCashOnCash">Target Cash on cash</label></p> <input value="'+property.targetCashOnCash+'" required class="signinForm" id="targetCashOnCash" type="text" placeholder="Target Cash On Cash"> <p><label for="targetEquityMultiple">Target equity multiple</label></p> <input value="'+property.targetEquityMultiple+'" required class="signinForm" id="targetEquityMultiple" type="text" placeholder="Target equity multiple"> <p><label for="averageCashYield">Average Cash Yield</label></p> <input value="'+property.averageCashYield+'" required class="signinForm" id="averageCashYield" type="text" placeholder="Average Cash Yield"> <p><label for="preferredReturn">Preferred Return</label></p> <input value="'+property.preferredReturn+'" required class="signinForm" id="preferredReturn" type="text" placeholder="Preferred Return"> <p><label for="projectedPassiveReturn">Projected Passive Return</label></p> <input value="'+property.projectedPassiveReturn+'" required class="signinForm" id="projectedPassiveReturn" type="text" placeholder="Projected Passive Return"> <p><label for="estimateHoldPeriod">Estimate Hold Period</label></p> <input value="'+property.estimateHoldPeriod+'" required class="signinForm" id="estimateHoldPeriod" type="text" placeholder="Estimate Hold Period"> <p><label for="minimumInvestmentAmount">Minimum Investment Amount</label></p> <input value="'+property.minimumInvestmentAmount+'" required onkeypress="return IsNumeric(event)" class="signinForm" id="minimumInvestmentAmount" type="text" placeholder="Minimum Investment Amount"> <p><label for="loanToCost">Loan to Cost</label></p> <input value="'+property.loanToCost+'" required class="signinForm" id="loanToCost" type="text" placeholder="Loan to Cost"> <p><label for="distributionPeriod">Distribution Period</label></p> <select value="'+property.distributionPeriod+'" id="distributionPeriod"> <option value="Monthly" selected>Monthly</option> <option value="Quarterly">Quarterly</option> <option value="Semi Annually">Semi Annually</option> <option value="Annually">Annually</option> <option value="Upon Sale">Upon Sale</option> </select> <p><label for="sponsorSplit">Sponsor Split</label></p> <input value="'+property.sponsorSplit+'" required class="signinForm" id="sponsorSplit" type="text" placeholder="Sponsor Split"> <p><label for="investorSplit">Investor Split</label></p> <input value="'+property.investorSplit+'" required class="signinForm" id="investorSplit" type="text" placeholder="Investor Split"> <p><label for="acquisitionFee">Acquisition Fee</label></p> <input value="'+property.acquisitionFee+'" required class="signinForm" id="acquisitionFee" type="text" placeholder="Acquisition Fee"> <p><label for="asserManagementFee">Asset Management Fee</label></p> <input value="'+property.asserManagementFee+'" required class="signinForm" id="asserManagementFee" type="text" placeholder="Asset Management Fee"> <p><label for="propertyManagementFee">Property Management Fee</label></p> <input value="'+property.propertyManagementFee+'" required class="signinForm" id="propertyManagementFee" type="text" placeholder="Property Management Fee"> <p><label for="purchaseSaleAgreementDate">Purchase Sale Agreement Date</label></p> <input value="'+property.purchaseSaleAgreementDate+'" required class="signinForm" id="purchaseSaleAgreementDate" type="date"> <p><label for="dueDiligenceCompletionDate">Due Diligence Completion Date</label></p> <input value="'+property.dueDiligenceCompletionDate+'" required class="signinForm" id="dueDiligenceCompletionDate" type="date"> <p><label for="privatePlacementMemorandumsDate">Private Placement Memorandums Date</label></p> <input value="'+property.privatePlacementMemorandumsDate+'" required class="signinForm" id="privatePlacementMemorandumsDate" type="date"> <p><label for="capitalRiseEndDate">Capital Raise End Date</label></p> <input value="'+property.capitalRiseEndDate+'" required class="signinForm" id="capitalRiseEndDate" type="date"> <p><label for="closingDate">Closing Date</label></p> <input value="'+property.closingDate+'" required class="signinForm" id="closingDate" type="date"> <p><label for="refinanceSaleFee">Refinance/Sale Fee</label></p> <input value="'+property.refinanceSaleFee+'" required onkeypress="return IsNumeric(event)" class="signinForm" id="refinanceSaleFee" type="text" placeholder="Refinance/Sale Fee"> <p><label for="capRateAtThePurchase">Cap Rate at the purchase</label></p> <input value="'+property.capRateAtThePurchase+'" required class="signinForm" id="capRateAtThePurchase" type="text" placeholder="Cap Rate at the purchase"> <p><label for="targetExitCapRate">Target Exit Cap Rate </label></p> <input value="'+property.targetExitCapRate+'" required class="signinForm" id="targetExitCapRate" type="text" placeholder="Target Exit Cap Rate "> <p><label for="investorAccreditation">Investor Accreditation</label></p> <input value="'+property.investorAccreditation+'" required class="signinForm" id="investorAccreditation" type="text" placeholder="Investor Accreditation"> <p><label for="1031ExchangEligible">1031 Exchange Eligible</label></p> <input value="'+property._1031ExchangEligible+'" required class="signinForm" id="1031ExchangEligible" type="text" placeholder="1031 Exchange Eligible"> <p><label for="oppurtunityZone">Opportunity Zone</label></p> <input value="'+property.oppurtunityZone+'" required class="signinForm" id="oppurtunityZone" type="text" placeholder="Opportunity Zone">'
  $('#editProperty').html(text)
  $('#propertyType').val(property.propertyType)
  $('#propertySubType').val(property.propertySubType)
  $('#investmentType').val(property.investmentType)
  $('#investmentStrategy').val(property.investmentStrategy)
  $('#distributionPeriod').val(property.distributionPeriod)

}