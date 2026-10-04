/**
 * <pre>
 * 1.업무명 : 산재보상시스템
 * 2.프로그램명 : 사회복귀 그리드 공통 자바스크립트
 * 3.ASIS : 
 * 4.설명 : 사회복귀 그리드 공통 자바스크립트
 * <pre>
 * @author 오종찬
 * @since  2025. 02. 19.
 * @version 1.0
 * 
 * <pre>
 * ------------------------------------------------------------------------
 *  Modification Information
 * ------------------------------------------------------------------------
 *  수정일               수정자            수정내용
 * ------------------------------------------------------------------------
 * 2025. 02. 19.               [SIA] Release 1.0
 * </pre> 
 */
window.re_com = {};


/**
 * 입력한 JSON 데이터의 키, 값을 비교한다.
 * @param jsonData1			비교하려는 JSON 데이터 1
 * @param jsonData2			비교하려는 JSON 데이터 2
 * @param excludeKeyArr		비교에서 제외할 Key 목록
 * @return	jsonData1 과 jsonData2 과 키, 값이 같으면 true, 아니면 false
 */
re_com.isEqualJson = function( jsonData1, jsonData2, excludeKeyArr ) {

	const jsonData1Keys = Object.keys(jsonData1);
	const jsonData2Keys = Object.keys(jsonData2);
	
	if ( jsonData1Keys.length !== jsonData2Keys.length ) {
		return false;
	}
	
	for ( let key of jsonData1Keys ) {
		if ( jsonData1[key] !== jsonData2[key] ) {
			if ( typeof jsonData1[key] == "object" && typeof jsonData2[key] == "object" ) {
				if ( re_com.isEqualJson(jsonData1[key], jsonData2[key], excludeKeyArr) == false ) {
					return false;
				}
			} else {
				if ( com.gfn_IsNull(excludeKeyArr) == false && excludeKeyArr.includes(key) ) {
					continue;
				}
				
				return false;
			}
		}
	}
	
	return true;
};

/**
 * 입력한 JSON 데이터 리스트의 입력 컬럼값 중 최대값을 구한다.
 * @param jsonDataList 	JSON Data List
 * @param key	최대값을 구할 컬럼 Key 
 */
re_com.maxJson = function( jsonDataList, key ) {
	let dataList = jsonDataList.map( function(item) {
		return item[key];
	});
	
	let maxValue = Math.max.apply(null, dataList);
	return maxValue;
};


/**
 * 입력한 JSON 데이터 리스트의 입력 컬럼값 중 최소값을 구한다.
 * @param jsonDataList 	JSON Data List
 * @param key	최소값을 구할 컬럼 Key 
 */
re_com.minJson = function( jsonDataList, key ) {
	let dataList = jsonDataList.map( function(item) {
		return item[key];
	});
	
	let minValue = Math.min.apply(null, dataList);
	return minValue;
};


/**
 * 입력한 JSON 데이터 리스트의 입력 키 목록의 값만 추출한다.
 * @param jsonDataList 	JSON Data List
 * @param keyArr	추출할 Key 목록 
 */
re_com.toStringJsonByKey = function( jsonDataList, keyArr ) {
	let strTemp = "[";
	for ( let idx = 0; idx < jsonDataList.length; idx++ ) {
		if ( idx > 0 ) {
			strTemp += ',';
		}
		
		strTemp += '{';
		let jsonData = jsonDataList[idx];
		for ( let keyIdx = 0; keyIdx < keyArr.length; keyIdx++ ) {
			if ( keyIdx > 0 ) {
				strTemp += ',';
			}

			let key = keyArr[keyIdx];
			strTemp += '"' + key + '":"' + jsonData[key] + '"'; 	
		}
		strTemp += '}';
	}
	
	
	strTemp += "]";
	return strTemp;
};



/**
 * @type   : function
 * @access : public
 * @desc   : 입력한 inputBox 의 값을 복사할 때 dash('-') 를 제거한다.
 * @param  : inputObj  
  */
re_com.removeDashOnCopy = function(inputObj) {
    
	inputObj.bind("oncopy", function(e) { 
      e.clipboardData.setData('text/plain', inputObj.getValue().replaceAll("-",""));
      e.preventDefault();
	} );
    
};


/**
 * @type   : function
 * @access : public
 * @desc   : 입력한 inputBox 의 값을 복사할 때 ch 를 제거한다.
 * @param  : inputObj  
 * @param  : ch	삭제할 문자  
 */
re_com.removeCharOnCopy = function(inputObj, ch) {
    
	inputObj.bind("oncopy", function(e) { 
      e.clipboardData.setData('text/plain', inputObj.getValue().replaceAll(ch,""));
      e.preventDefault();
	} );
    
};





/**
 * @type   : function
 * @access : public
 * @desc   : 입력한 inputBox 에 값을 입력할 때, 소문자를 대문자로 치환한다.
 * @param  : inputObj  
  */
re_com.upperCaseOnEdit = function(inputObj) {
    
	inputObj.bind("oneditkeyup", function(info, e) { 
		if ( e.key >= 'a' && e.key <= 'z' ) {
			const value = inputObj.getValue();
			inputObj.setValue(com.UpperCase(value));
		}
		
	} );
    
};



/**
 * @type   : function
 * @access : public
 * @desc   : 입력한 spinner 변경된 값이 최소~최대 범위를 벗어난 경우, 최대(최소) 값으로 설정한다.
 * @param spinnerObj spinner 객체
 * @param oldValue   spinnerObj 이전 값
 * @param newValue   spinnerObj 새 값
 * @return 범위를 벗어난 경우 참
  */
re_com.checkSpinnerValue = function(spinnerObj, oldValue, newValue) {
	console.debug('checkSpinnerValue - oldValue:' + oldValue + ', newValue:' + newValue);

	let value = com.toInteger(newValue);
	if ( isNaN(value) ) {
		console.debug('checkSpinnerValue isNaN : ' + value + ' [' + spinnerObj.options.minValue + '~'  + spinnerObj.options.maxValue + ']');
		spinnerObj.setValue(oldValue);
		return true;
	} else if ( value < spinnerObj.options.minValue ) {
		console.debug('checkSpinnerValue under minValue : ' + value + ' [' + spinnerObj.options.minValue + '~'  + spinnerObj.options.maxValue + ']');
		spinnerObj.setValue(oldValue);
		return true;
	} else if ( value > spinnerObj.options.maxValue ) {
		console.debug('checkSpinnerValue over maxValue : ' + value + ' [' + spinnerObj.options.minValue + '~'  + spinnerObj.options.maxValue + ']');
		spinnerObj.setValue(oldValue);
		return true;
	}
    
	return false;
};
