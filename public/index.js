
var output = function(code){
    
    const data = parseCode128(code);
    
    return JSON.stringify(data,null,2);
}



const CodeToKey = {
    DCA: 'jurisdictionVehicleClass',
    DCB: 'jurisdictionRestrictionCodes',
    DCD: 'jurisdictionEndorsementCodes',
    DBA: 'dateOfExpiry',
    DCS: 'lastName',
    DAC: 'firstName',
    DCT: 'firstName',
    DAD: 'middleName',
    DBD: 'dateOfIssue',
    DBB: 'dateOfBirth',
    DBC: 'sex',
    DAY: 'eyeColor',
    DAU: 'height',
    DAG: 'addressStreet',
    DAI: 'addressCity',
    DAJ: 'addressState',
    DAK: 'addressPostalCode',
    DAQ: 'documentNumber',
    DCF: 'documentDiscriminator',
    DCG: 'issuer',
    DDE: 'lastNameTruncated',
    DDF: 'firstNameTruncated',
    DDG: 'middleNameTruncated',
    // optional
    DAZ: 'hairColor',
    DAH: 'addressStreet2',
    DCI: 'placeOfBirth',
    DCJ: 'auditInformation',
    DCK: 'inventoryControlNumber',
    DBN: 'otherLastName',
    DBG: 'otherFirstName',
    DBS: 'otherSuffixName',
    DCU: 'nameSuffix', // e.g. jr, sr
    DCE: 'weightRange',
    DCL: 'race',
    DCM: 'standardVehicleClassification',
    DCN: 'standardEndorsementCode',
    DCO: 'standardRestrictionCode',
    DCP: 'jurisdictionVehicleClassificationDescription',
    DCQ: 'jurisdictionEndorsementCodeDescription',
    DCR: 'jurisdictionRestrictionCodeDescription',
    DDA: 'complianceType',
    DDB: 'dateCardRevised',
    DDC: 'dateOfExpiryHazmatEndorsement',
    DDD: 'limitedDurationDocumentIndicator',
    DAW: 'weightLb',
    DAX: 'weightKg',
    DDH: 'dateAge18',
    DDI: 'dateAge19',
    DDJ: 'dateAge21',
    DDK: 'organDonor',
    DDL: 'veteran'
  }


const lineSeparator = "\n";

const defaultOptions = {suppressErrors: true};

 function parseCode128(str, options = defaultOptions) {

  const props = {};
  const rawLines = str.trim().split(lineSeparator);
  const lines = rawLines.map(rawLine => sanitizeData(rawLine));
  let started;
  lines.slice(0, -1).forEach(line => {
    if (!started) {
      if (line.indexOf("ANSI ") === 0) {
        started = true;
      }
      return;
    }

    let code = getCode(line);
    let value = getValue(line);
    let key = getKey(code);
    if (!key) {
      if (options.suppressErrors) {
        return;
      } else {
        throw new Error("unknown code: " + code);
      }
    }

    if (isSexField(code)) value = getSex(code, value);

    props[key] = isDateField(key) ? getDateFormat(value) : value;
  });

  return props;
};

const sanitizeData = rawLine => rawLine.match(/[\011\012\015\040-\177]*/g).join('').trim();

const getCode = line => line.slice(0, 3);
const getValue = line => line.slice(3);
const getKey = code => CodeToKey[code];

const isSexField = code => code === "DBC";

const getSex = (code, value) => (value === "1" ? "M" : "F");

const isDateField = key => key.indexOf("date") === 0;

const getDateFormat = value => {
  const parts = [value.slice(0, 2), value.slice(2, 4), value.slice(4)];
  return parts.join("/");
};



function doScan(image) {

    var
            canvas = document.createElement('canvas'),
            canvas_context = canvas.getContext('2d'),
            source,
            binarizer,
            bitmap;

    // $('.error').empty();
    // $('.decodedText').empty();

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    
    canvas_context.drawImage(image, 0, 0, canvas.width, canvas.height);

    try {
        source = new ZXing.BitmapLuminanceSource(canvas_context, image);
        binarizer = new ZXing.Common.HybridBinarizer(source);
        bitmap = new ZXing.BinaryBitmap(binarizer);

        let rawOutput = JSON.stringify(ZXing.PDF417.PDF417Reader.decode(bitmap, null, false), null, 4);
        let parsedOutput = JSON.parse(rawOutput);
        
        
        if(parsedOutput.length === 0){
            return {};
        }

        let decodedText = output(parsedOutput[0].Text);
        console.log(parsedOutput[0].Text);
        return JSON.parse(decodedText);
    } catch (err) {
        // $('.error').text(err);
    }
}
