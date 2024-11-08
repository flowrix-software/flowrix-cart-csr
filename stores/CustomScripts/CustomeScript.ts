import { defineStore } from 'pinia';
interface SelectedOptions {
    name: Object;
}
interface attributeIdz {
    name: Object;
}
interface lookupprices {
    name: Object;
}
interface servicePriceSetting {
    name: Object;
}
interface conditions {
    name: Object;
}
interface TYPES {
    name: Object;
}
interface PRICETYPE {
    name: Object;
}
interface UNIT_RELATIVE {
    name: Object;
}
interface DISCOUNTS {
    name: Object;
}
interface measurementUnit {
    name: Object;
}
interface promotionSettings {
    name: Object;
}
interface B2BTYPE {
    name: Object;
}
interface USEBASEPRICE {
    name: Object;
}
interface BASEPRICE {
    name: Object;
}
interface usefitting {
    name: Object;
}
interface sevice_price_type {
    name: Object;
}
interface serviceprice {
    name: Object;
}
interface With_this_selection_following_selections_will_be_changed {
    name: Object;
}

interface State {
SelectedOptions:Record<string, string>|any;
attributeIdz:object|any;
lookupprices:lookupprices|null;
servicePriceSetting:object|any;
conditions:conditions|null;
TYPES:Record<string, string>|any;
PRICETYPE:Record<string, string>|any;
UNIT_RELATIVE:Record<string, string>|any;
DISCOUNTS:Record<string, string>|any;
measurementUnit:Record<string, string>|any;
promotionSettings:Record<string, string>|any;
B2BTYPE:Record<string, string>|any;
USEBASEPRICE:Record<string, string>|any;
BASEPRICE:Record<string, string>|any;
usefitting:Record<string, string>|any;
sevice_price_type:Record<string, string>|any;
serviceprice:Record<string, string>|any;
With_this_selection_following_selections_will_be_changed:string|null;
attributeOf:string|null;
attributeValuesClass:string|null;
attributeClass:string|null;
attributeClassName:string|null;
valueClassName:string|null;
valueClass:string|null;
valueChildClass:string|null;
groupClassName:string|null;
groupClass:string|null;
priceClass:string|null;
rrpriceClass:string|null;
qtyElement:string|null;
rrpriceWrapper:string|null;
imageElement:string|null;
useBackground:any|null;
pdpsummary:Record<string, string>|null;
msgStr:Record<string, string>|null;
productPrice:Record<number, number>|null;
productDiscountedPrice:Record<number, number>|null;

}

export const useCustomScript = defineStore('CustomScript', {
    state: (): State => ({
        SelectedOptions: null,
        attributeIdz:null,
        lookupprices:null,
        servicePriceSetting:{},
        conditions:null,
        TYPES:null,
        PRICETYPE:null,
        UNIT_RELATIVE:null,
        DISCOUNTS:null,
        measurementUnit:null,
        promotionSettings:null,
        B2BTYPE:null,
        USEBASEPRICE :null,
        BASEPRICE:null,
        usefitting:null,
        sevice_price_type:null,
        serviceprice:null,
        With_this_selection_following_selections_will_be_changed:'With this selection following selections will be changed \n',
        attributeOf:'.attributeof',
        attributeValuesClass:'.attributevalue',
        attributeClass:'.attribute',
        attributeClassName:'attribute',
        valueClassName:'value',
        valueClass:'.value',
        valueChildClass:'.child',
        groupClassName:'group',
        groupClass:'.group',
        priceClass:'.price .price_span',
        rrpriceClass:'.price .price_span',
        qtyElement:'#blind-product-form #quantity',
        rrpriceWrapper:'.price .if-discounted',
        imageElement:'.swatch-image-change img',
        useBackground:false,
        pdpsummary:{},
        msgStr:{},
        productPrice:0,
        productDiscountedPrice:0
    }),
    actions: {
        CallScriptFIrstTime(){
            this.processAttributes();
            this.setConditions('', true);
            let hasnewMeasurements = this.setWidthHeightbaseonStyle();
            if (hasnewMeasurements) {
                this.setConditions('', true);
            }
            this.calculatePrice();
        },
        async initprocess() {
            let gid =this.SelectedOptions.gid
            let aid =this.SelectedOptions.aid
            let vid =this.SelectedOptions.vid
            var current_selected = Object.values ( this.attributeIdz[ aid ][ 'values' ] ).find ( v => ( v.selected == true && v.applyhidden == false && v.shouldhidden == false ) );
            if(current_selected !=undefined ||current_selected!=null)
            {
                if (this.attributeIdz[ aid ].type == this.TYPES['width'] 
                        || this.attributeIdz[ aid ].type == this.TYPES['subwidth'] 
                        || this.attributeIdz[ aid ].type == this.TYPES['height'] 
                        || this.attributeIdz[ aid ].type == this.TYPES['subheight'] 
                        || this.attributeIdz[ aid ].type == this.TYPES['number'] 
                        || this.attributeIdz[ aid ].type == this.TYPES['text'] 
                        || this.attributeIdz[ aid ].type == this.TYPES['message']
                    ) 
                {
                    let oldvalue = this.attributeIdz[ aid ][ 'values' ][ current_selected.id ][ 'value' ];
                    this.attributeIdz[ aid ][ 'values' ][ current_selected.id ][ 'ovalue' ] = oldvalue;

                    if (this.attributeIdz[ aid ].type != this.TYPES['text'] 
                        && this.attributeIdz[ aid ].type != this.TYPES['message']) 
                    {
                        vid = parseFloat(vid);
                    }

                    this.attributeIdz[ aid ][ 'values' ][ current_selected.id ][ 'value' ] = vid;

                    this.setSummery(this.attributeIdz[ aid ],current_selected)

                }else
                {
                    if (this.attributeIdz[ aid ].type == this.TYPES['drop-down'] || this.attributeIdz[ aid ].type == this.TYPES['style'] || this.attributeIdz[ aid ].type == this.TYPES['swatch']) 
                    {
                        this.attributeIdz[ aid ][ 'values' ][ current_selected.id ][ 'selected' ] = false;
                        this.attributeIdz[ aid ][ 'values' ][ current_selected.id ][ 'oldselected' ] = true;
                    }

                }

            }

            var newvalue = Object.values ( this.attributeIdz[ aid ][ 'values' ] ).find ( v => ( v.id == vid ) );

            if(newvalue !=undefined && (this.attributeIdz[ aid ].type == this.TYPES['drop-down'] || this.attributeIdz[ aid ].type == this.TYPES['style'] || this.attributeIdz[ aid ].type == this.TYPES['swatch']))
            {
                this.attributeIdz[ aid ][ 'values' ][ newvalue.id ][ 'selected' ] = true;
                this.attributeIdz[ aid ][ 'values' ][ newvalue.id ][ 'oldselected' ] = false;
                if (this.attributeIdz[ aid ].type == this.TYPES['width'] || this.attributeIdz[ aid ].type == this.TYPES['subwidth'] || this.attributeIdz[ aid ].type == this.TYPES['height'] || this.attributeIdz[ aid ].type == this.TYPES['subheight'] )
                {
                   
                    this.markSelected(aid,newvalue.value)
                }
                else
                {
                    this.markSelected(aid,newvalue.id)
                }
                this.setSummery(this.attributeIdz[ aid ],newvalue)

            }

            // debugger

            var allattribs = Object.values ( this.attributeIdz ).filter ( a => a.parent == aid )
            allattribs = allattribs.sort ( ( a, b ) => ( a.gsortorder - b.gsortorder ) || ( a.sortorder - b.sortorder ) )
            this.processAttribute ( allattribs )

            this.setConditions(aid,false)

            let hasnewMeasurements = this.setWidthHeightbaseonStyle()

            if(hasnewMeasurements)
            {
                this.setConditions(aid,false)
            }
            
            this.calculatePrice() 
            this.calculateservicePrice() 
            this.swatchimage()
            // if (typeof finalize == 'function') {
            //         this.finalize()
            // }
            var allattribs = Object.values ( this.attributeIdz )
            allattribs = allattribs.sort ( ( a, b ) => ( a.gsortorder - b.gsortorder ) || ( a.sortorder - b.sortorder ) )
            // this.processAttribute ( allattribs )
            console.log(allattribs)
            // allattribs.forEach(function(attribute) {
            //     let findhiddenvalues = Object.values(attribute['values']).filter(
            //       (v) => v.applyhidden == true
            //     )
            //     if(findhiddenvalues.length>0){
            //       findhiddenvalues.forEach(function(value) {
            //         var element = document.querySelector(`[data-value="${value.id}"]`);
            //         //console.log(element)
            //         if (element) {
            //           element.disabled = true
            //             element.style.display = 'none';
            //             element.parentElement.style.display = 'none';
            //         }
            //       })
            //     }
            //   });
        },
        setWidthHeightbaseonStyle() {
            // Filter style attributes to find min/max width and min/max height
            const style_attributes = Object.values(this.attributeIdz).filter(a => a.type == this.TYPES['style'] && a.hide == 0);
            
            let hasChanged = false;
        
            if (style_attributes.length > 0) {
                let minwidths = [];
                let maxwidths = [];
                let minheights = [];
                let maxheights = [];
        
                style_attributes.forEach(attribute => {
                    const selectedv = Object.values(attribute['values']).find(v => v.selected == true && v.applyhidden == false && v.shouldhidden == false);
                    if (selectedv !== undefined) {
                        if (selectedv.enable_dimensions) {
                            maxheights.push(selectedv.max_height);
                            minheights.push(selectedv.min_height);
                            maxwidths.push(selectedv.max_width);
                            minwidths.push(selectedv.min_width);
                        }
                    }
                });
        
                const min_width = Math.max(...minwidths);
                const max_width = Math.max(...maxwidths);
                const min_height = Math.max(...minheights);
                const max_height = Math.max(...maxheights);
        
                if (min_width !== undefined && min_width > 0 && max_width !== undefined && max_width > 0) {
                    const findwidth = Object.values(this.attributeIdz).find(a => a.type == this.TYPES['width']);
                    
                    if (findwidth !== undefined) {
                        const value_ids = Object.keys(this.attributeIdz[findwidth.id]['values']);
                        if (value_ids.length > 0 && value_ids[0] !== undefined) {
                            const vid = value_ids[0];
                            this.attributeIdz[findwidth.id]['values'][vid]['min_width'] = min_width;
                            this.attributeIdz[findwidth.id]['values'][vid]['max_width'] = max_width;
        
                            let value = this.attributeIdz[findwidth.id]['values'][vid]['value'];
                            this.attributeIdz[findwidth.id]['values'][vid]['ovalue'] = value;
                            let newvalue = value;
        
                            // If current value is less than min width, set value to min width
                            if (value < min_width) {
                                newvalue = min_width;
                            }
                            // If current value is greater than max width, set value to max width
                            if (value > max_width) {
                                newvalue = max_width;
                            }
        
                            if (value != newvalue) {
                                hasChanged = true;
                            }
        
                            this.attributeIdz[findwidth.id]['values'][vid]['value'] = newvalue;
        
                            const widthElement = document.querySelector(this.attributeClass + findwidth.id);
                            if (widthElement) {
                                widthElement.value = newvalue;
                                widthElement.setAttribute('value', newvalue);
                            }
                        }
                    }
                }
        
                if (min_height !== undefined && min_height > 0 && max_height !== undefined && max_height > 0) {
                    const findheight = Object.values(this.attributeIdz).find(a => a.type == this.TYPES['height']);
                    
                    if (findheight !== undefined) {
                        const value_ids = Object.keys(this.attributeIdz[findheight.id]['values']);
                        if (value_ids.length > 0 && value_ids[0] !== undefined) {
                            const vid = value_ids[0];
                            this.attributeIdz[findheight.id]['values'][vid]['min_height'] = min_height;
                            this.attributeIdz[findheight.id]['values'][vid]['max_height'] = max_height;
        
                            let value = this.attributeIdz[findheight.id]['values'][vid]['value'];
                            this.attributeIdz[findheight.id]['values'][vid]['ovalue'] = value;
                            let newvalue = value;
        
                            // If current value is less than min height, set value to min height
                            if (value < min_height) {
                                newvalue = min_height;
                            }
                            // If current value is greater than max height, set value to max height
                            if (value > max_height) {
                                newvalue = max_height;
                            }
        
                            if (value != newvalue) {
                                hasChanged = true;
                            }
        
                            this.attributeIdz[findheight.id]['values'][vid]['value'] = newvalue;
        
                            const heightElement = document.querySelector(this.attributeClass + findheight.id);
                            if (heightElement) {
                                heightElement.value = newvalue;
                                heightElement.setAttribute('value', newvalue);
                            }
                        }
                    }
                }
        
                return hasChanged;
            }
        
            return false;
        },
        setSummery(attrib:any,value:any) {
             let title ='';
    
            if ( attrib[ 'type' ] ==  this.TYPES['width'] || attrib[ 'type' ] ==  this.TYPES['subwidth'] || attrib[ 'type' ] ==  this.TYPES['height'] || attrib[ 'type' ] ==  this.TYPES['subheight'] ) 
            {
                title = parseFloat ( value['value'] )  + ' ' + this.measurementUnit;
            }  else if ( attrib[ 'type' ] ==  this.TYPES['number'] || attrib[ 'type' ] ==  this.TYPES['message']  || attrib[ 'type' ] ==  this.TYPES['text'] ) 
            {
                 title =  value['value']
    
            }else{
                title = value['title']
            }
            this.pdpsummary[attrib[ 'id' ]] = {'attribute':attrib['title'],'value':title,'gsortorder':attrib['gsortorder'],'sortorder':attrib['sortorder']};
        },
        unsetSummery(aid:any) {
            
            delete this.pdpsummary[aid]
        },
        hideValue(h_aid:any,h_vid:any) {
            this.markUnselected(h_aid,h_vid)
        },
        showValue(h_aid:any, h_vid:any) {
            const element = document.querySelector(`${this.attributeClass + h_aid} [data-value="${h_vid}"]`);
            if (element) {
                element.parentElement.style.display='block'
                element.removeAttribute('disabled');
                element.style.display = '';
            }
        },
        showAttribute(aid:any) {
            const element = document.querySelector(this.attributeClass + aid);
            if (element) {
                element.style.display = '';
            }
        },
        hideAttribute(aid:any) {
            this.unsetSummery(aid);
            const element = document.querySelector(this.attributeClass + aid);
            if (element) {
                element.style.display = 'none';
            }
        },
        hideChildValues(aid:any, parent_id:any) {
            const childElements = document.querySelectorAll(`${this.attributeClass + aid} [data-attributevalue="${parent_id}"]`);
            childElements.forEach((element) => {
                let grandparent = element.parentElement?.parentElement;
                element.selected = false;
                element.checked = false;
                element.removeAttribute('selected');
                element.removeAttribute('checked');
                element.classList.remove('active');
                element.style.display = 'none';
                element.parentElement.style.display = 'none';
                if (grandparent && grandparent.classList.contains('swiper-slide')) {
                    grandparent.parentElement.style.display = 'none';
                }
                element.disabled = true;
            });
        },
        showChildValues(aid:any, parent_selected_val_id:any) {
            const childElements = document.querySelectorAll(`${this.attributeClass + aid} [data-child="${parent_selected_val_id}"]`);
            
            childElements.forEach((element) => {
                let grandparent = element.parentElement?.parentElement;
                element.removeAttribute('disabled');
                element.parentElement.style.display = '';
                if (grandparent && grandparent.classList.contains('swiper-slide')) {
                    grandparent.parentElement.style.display = '';
                }
                element.style.display = '';
            });
        },
        showGroup(gid:any) {
            const groupElement = document.querySelector(this.groupClass + gid);
            if (groupElement) {
                groupElement.style.display = '';
            }
        },
        hideGroup(gid:any) {
            document.querySelector(this.groupClass + gid).style.display = 'none';
        },
        markSelected(h_aid:any, h_vid:any) {
            
            const element = document.querySelector(`${this.attributeClass}${h_aid} [data-value="${h_vid}"]`);
            
            if (element) {
                element.parentElement.style.display='block'
                element.setAttribute('selected', true);
                element.checked = true;
                element.style.display = 'block';
                element.classList.add('active');
                if(element.getAttribute('customselect')=='true'){
                    element.dispatchEvent(new Event('change'));
                }
                
            }
            const container = document.querySelector(`${this.attributeClass}${h_aid}`);
            if (container) {
                container.value = h_vid;
            }
        },
        markInputSelected(aid:any, vid:any, value:any=null) {
            const element = document.querySelector(this.attributeClass + aid);
            const dataValueElement = element.querySelector('[data-value="' + vid + '"]');
            
            if (dataValueElement) {
                dataValueElement.setAttribute('selected', true);
                dataValueElement.checked = true;
                dataValueElement.style.display = 'block';
                dataValueElement.classList.add('active');
            }
        
            if (value == 0 || value == '0') {
                value = '';
            }
        
            element.value = value;
        },
        markUnselected(h_aid:any, h_vid:any) {
            const element = document.querySelector(`${this.attributeClass + h_aid} [data-value="${h_vid}"]`);
            if (element) {
                
                element.parentElement.style.display='none'
                element.removeAttribute('selected');
                element.checked = false;
                element.style.display = 'none';
                element.classList.remove('active');
                element.setAttribute('disabled', 'true');
            }
        },
        findSelectedValue(values:any) {
            return Object.values ( values ).find ( v => v.selected == true && v.applyhidden == false && v.shouldhidden == false)
        },
        processAttributes () {

            var allattribs = Object.values ( this.attributeIdz ).filter ( a => a.parent == null )
            allattribs = allattribs.sort ( ( a, b ) => ( a.gsortorder - b.gsortorder ) || ( a.sortorder - b.sortorder ) )

            this.processAttribute ( allattribs )

        },
        processAttribute(attributes:any) {
            const self = this;
            if (attributes !== undefined && attributes.length > 0) {
                attributes.forEach((attrib) => {
                    if (attrib.values == undefined) {
                        return;
                    }
                    
                    let selected_val = self.findSelectedValue(attrib.values);
                    let parent_id = attrib.parent_id;
                    
                   
                    if (parent_id && parent_id !== 0) {
                        self.hideAttribute(attrib.id);
                        
                        let parent_selected_val = self.findSelectedValue(self.attributeIdz[parent_id]['values']);
                        
                        if (parent_selected_val !== undefined) {
                            self.showAttribute(attrib.id);
                            self.hideChildValues(attrib.id, parent_id);
                            self.showChildValues(attrib.id, parent_selected_val.id);
        
                            if (selected_val == undefined) {
                                let available_value_array = Object.values(self.attributeIdz[attrib.id]['values']).filter(v => (
                                    v.parent_id == parent_selected_val.id &&
                                    v.selected == false &&
                                    v.applyhidden == false &&
                                    v.shouldhidden == false
                                ));
        
                                if (available_value_array.length > 0) {
                                    available_value_array.sort((a, b) => a.sortorder - b.sortorder);
                                    selected_val = available_value_array[0];
                                    self.attributeIdz[attrib.id]['values'][selected_val.id]['selected'] = true;
                                    self.attributeIdz[attrib.id]['values'][selected_val.id]['oldselected'] = false;
        
                                    self.setSummery(attrib, selected_val);
                                    if ([
                                        self.TYPES['width'], self.TYPES['subwidth'],
                                        self.TYPES['height'], self.TYPES['subheight']
                                    ].includes(self.attributeIdz[attrib.id].type)) {
                                        self.markInputSelected(attrib.id, selected_val.value);
                                    } else {
                                        self.markSelected(attrib.id, selected_val.id);
                                    }
                                } else {
                                    selected_val = undefined;
                                    self.hideAttribute(attrib.id);
                                    self.hideAttributeHirerachy(attrib.id);
                                }
                                
                            }
        
                            if (selected_val !== undefined && selected_val.parent_id !== parent_selected_val.id) {
                                self.attributeIdz[attrib.id]['values'][selected_val.id]['selected'] = false;
                                self.attributeIdz[attrib.id]['values'][selected_val.id]['oldselected'] = true;
        
                                let available_value_array = Object.values(self.attributeIdz[attrib.id]['values']).filter(v => (
                                    v.parent_id == parent_selected_val.id &&
                                    v.selected == false &&
                                    v.applyhidden == false &&
                                    v.shouldhidden == false
                                ));
        
                                if (available_value_array.length > 0) {
                                    self.hideChildValues(attrib.id, parent_id);
                                    self.showChildValues(attrib.id, parent_selected_val.id);
        
                                    available_value_array.sort((a, b) => a.sortorder - b.sortorder);
                                    selected_val = available_value_array[0];
                                    self.attributeIdz[attrib.id]['values'][selected_val.id]['selected'] = true;
                                    self.attributeIdz[attrib.id]['values'][selected_val.id]['oldselected'] = false;
        
                                    self.setSummery(attrib, selected_val);
                                    if ([
                                        self.TYPES['width'], self.TYPES['subwidth'],
                                        self.TYPES['height'], self.TYPES['subheight']
                                    ].includes(self.attributeIdz[attrib.id].type)) {
                                        self.markInputSelected(attrib.id, selected_val.id, selected_val.value);
                                    } else {
                                        self.markSelected(attrib.id, selected_val.id);
                                    }
                                } else {
                                    selected_val = undefined;
                                    
                                    self.hideAttribute(attrib.id);
                                    self.hideAttributeHirerachy(attrib.id);
                                }
                            } else {
                                if (selected_val && selected_val.parent_id == parent_selected_val.id) {
                                    
                       
                                    self.showChildValues(attrib.id, parent_selected_val.id);
                                }
                                if (selected_val) {
                                    if ([
                                        self.TYPES['width'], self.TYPES['subwidth'],
                                        self.TYPES['height'], self.TYPES['subheight']
                                    ].includes(self.attributeIdz[attrib.id].type)) {
                                        self.markInputSelected(attrib.id, selected_val.id, selected_val.value);
                                    } else {
                                        self.markSelected(attrib.id, selected_val.id);
                                    }
                                }
                            }
                        } else {
                            
                            self.hideChildValues(attrib.id, parent_id);
                        }
                    }
        
                    if (selected_val) {
                        self.setSummery(attrib, selected_val);
        
                        if (![self.TYPES['width'], self.TYPES['subwidth'], self.TYPES['height'], self.TYPES['subheight'], self.TYPES['number'], self.TYPES['message'], self.TYPES['text']].includes(attrib['type'])) {
                            if ([
                                self.TYPES['width'], self.TYPES['subwidth'],
                                self.TYPES['height'], self.TYPES['subheight']
                            ].includes(self.attributeIdz[attrib.id].type)) {
                                self.markInputSelected(attrib.id, selected_val.id, selected_val.value);
                            } else {
                                self.markSelected(attrib.id, selected_val.id);
                            }
        
                            let child_attrib = Object.values(self.attributeIdz).filter(a => a.parent == attrib['id']);
                            if (child_attrib.length > 0) {
                                self.processChildAttribute(child_attrib);
                            }
                        }
                    }
                });
            }
        },
        hideAttributeHirerachy(aid:any) {            
            var child_attrib = Object.values ( this.attributeIdz ).filter ( a => a.parent == aid )
            this.hideChildAttributes(child_attrib)
        },
        hideChildAttributes(child_attrib:any) {
            const self = this
            child_attrib.forEach(cattrib => {
                // Unselect the selected value
                const select_value = Object.values(cattrib['values']).find(v => v.selected == true && v.applyhidden == false);
                if (select_value !== undefined) {
                    self.attributeIdz[cattrib.id]['values'][select_value.id]['selected'] = false;
                    self.attributeIdz[cattrib.id]['values'][select_value.id]['oldselected'] = true;
                }
        
                self.hideAttribute(cattrib['id']);
        
                const childattrib = Object.values(self.attributeIdz).filter(a => a.parent == cattrib['id']);
        
                self.hideChildAttributes(childattrib);
            });
        },
        processChildAttribute ( child_attrib:any ) {
            child_attrib = child_attrib.sort ( ( a, b ) => ( a.gsortorder - b.gsortorder ) || ( a.sortorder - b.sortorder ) )
            this.processAttribute(child_attrib)        
        },
        setConditions(aid?:any = '', first_call:any = false) {
            const self = this
            var available = 1;
            let pick_first_value = '';
        
            var changed_attribs = {};
            let response = true;
        
            if (this.attributeIdz !== undefined) {
                var msgAttributes = {};
                var hiddenAttributes = {};
                var childAttributes = {};
                var changed_values = Object.create({});
        
                Object.keys(this.conditions).forEach((c_aid) => {
                    var db_condition = self.conditions[c_aid];
                    var changed_values = {};
                    var hiddenValues = {};
                    var child_Values = {};
                    var msgValue = {};
        
                    Object.keys(db_condition).forEach((v_id) => {
                        var cond = db_condition[v_id];
                        let newcondition = self.createCondition(cond);
        
                        if (self.attributeIdz[c_aid]['values'][v_id] !== undefined) {
                            let conditionReturn = self.executeCondition(newcondition, c_aid, v_id, changed_values, msgValue, hiddenValues, child_Values, first_call);
                            changed_values = conditionReturn['changed_values'];
                            msgValue = conditionReturn['msgValue'];
                            hiddenValues = conditionReturn['hiddenValues'];
                            child_Values = conditionReturn['child_Values'];
                           
                        }

                        
        
                        if (Object.keys(msgValue).length > 0) {
                            msgAttributes[c_aid] = msgValue;
                        }
        
                        if (Object.keys(changed_values).length > 0) {
                            changed_attribs[c_aid] = changed_values;
                        }
        
                        if (Object.keys(hiddenValues).length > 0) {
                            hiddenAttributes[c_aid] = hiddenValues;
                        }
        
                        if (Object.keys(child_Values).length > 0) {
                            childAttributes[c_aid] = child_Values;
                        }
                    });
        
                    var selected_value_hidden_array = Object.values(self.attributeIdz[c_aid]['values']).filter((v) => v.selected == true && v.shouldhidden == true);
                    if (selected_value_hidden_array.length > 0) {
                        self.selectOneValue(c_aid);
        
                        selected_value_hidden_array.forEach((hidden_value) => {
                            self.attributeIdz[c_aid]['values'][hidden_value.id]['selected'] = false;
                            self.attributeIdz[c_aid]['values'][hidden_value.id]['oldselected'] = false;
                            self.markUnselected(c_aid, hidden_value.id);
        
                            let conditionReturn = self.checkChangeAttributesMsg(c_aid, msgAttributes, msgValue, hidden_value, child_Values, first_call, available);
                            child_Values = conditionReturn['child_Values'];
        
                            if (Object.keys(child_Values).length > 0) {
                                childAttributes[c_aid] = child_Values;
                            }
                        });
        
                        selected_value_hidden_array.sort((a, b) => a.sortorder - b.sortorder);
                       pick_first_value = selected_value_hidden_array[0];
                       self.attributeIdz[c_aid]['values'][pick_first_value.id]['oldselected'] = true;
        
                        self.hideAttributeOrGroup(c_aid);
                    } else {
                        self.selectOneValue(c_aid);
                    }
                });
        
                if ((Object.values(this.msgStr).length > 0 || Object.values(childAttributes).length) && first_call == false) {
                    response = true;
                
                    if (Object.values(this.msgStr).length > 0) {
                        response = this.confirmChange(changed_attribs, hiddenAttributes, aid);
                    }
                
                    Object.keys(childAttributes).forEach(function(a_id) {
                        let a_values = childAttributes[a_id];
                        let gid = self.attributeIdz[a_id] !== undefined ? self.attributeIdz[a_id]['gid'] : 1;
                
                        Object.values(a_values).forEach(function(value, v_id) {
                            // when selected = false we have to hide its childs
                            if (value.confirm_popup == true) {
                                if (response == true) {
                                    if (value.selected == true && value.show == true && value.child > 0) {
                                        self.markSelected(a_id, v_id);
                                        let child_attribute = Object.values(self.attributeIdz).filter(a => a.parent_id == a_id && a.hide == 0);
                                        self.processAttribute(child_attribute);
                                    }
                                    if (value.selected == false && value.hide == true && value.child > 0) {
                                        let child_attribute = Object.values(self.attributeIdz).filter(a => a.parent_id == a_id && a.hide == 0);
                                        if (child_attribute.length > 0) {
                                            child_attribute.forEach(function(attribute) {
                                                let child_selected = Object.values(attribute['values']).find(v => v.parent_id == v_id && v.selected == true);
                                                self.hideChildValues(attribute.id, a_id);
                
                                                if (child_selected !== undefined) {
                                                    self.attributeIdz[attribute.id]['values'][child_selected.id]['selected'] = false;
                                                    self.markUnselected(attribute.id, child_selected.id);
                                                }
                
                                                let find_any_selected = Object.values(attribute['values']).find(v => v.selected == true && v.applyhidden == false && v.shouldhidden == false);
                                                if (find_any_selected == undefined) {
                                                    self.hideAttributeOrGroup(attribute.id);
                                                    self.hideAttribute(attribute.id);
                                                    self.unsetMsg(attribute.id);
                                                }
                                            });
                                        }
                                    }
                                }
                            } else if (value.confirm_popup == false) {
                                if (value.selected == false) {
                                    if (value.hide == true && value.child > 0) {
                                        self.markUnselected(a_id, v_id);
                
                                        let child_attribute = Object.values(self.attributeIdz).filter(a => a.parent_id == a_id && a.hide == 0);
                                        if (child_attribute.length > 0) {
                                            child_attribute.forEach(function(attribute) {
                                                let child_selected = Object.values(attribute['values']).find(v => v.parent_id == v_id && v.selected == true);
                                                self.hideChildValues(attribute.id, a_id);
                
                                                if (child_selected !== undefined) {
                                                    self.attributeIdz[attribute.id]['values'][child_selected.id]['selected'] = false;
                                                    self.markUnselected(attribute.id, child_selected.id);
                                                }
                
                                                let find_any_selected = Object.values(attribute['values']).find(v => v.selected == true && v.applyhidden == false && v.shouldhidden == false);
                                                if (find_any_selected == undefined) {
                                                    self.hideAttributeOrGroup(attribute.id);
                                                    self.hideAttribute(attribute.id);
                                                    self.unsetMsg(attribute.id);
                                                }
                                            });
                                        }
                                    } else if (value.show == true) {
                                        if (value.child > 0) {
                                            let child_attribute = Object.values(self.attributeIdz).filter(a => a.parent_id == a_id && a.hide == 0);
                                            self.processAttribute(child_attribute);
                                        } else {
                                            let child_attribute = Object.values(self.attributeIdz).filter(a => a.parent_id == a_id && a.hide == 0);
                                            child_attribute.forEach(function(attribute) {
                                                if (attribute.parent_id) {
                                                    let find_selectedValue = Object.values(self.attributeIdz[attribute.parent_id]['values']).find(v => v.selected == true && v.applyhidden == false && v.shouldhidden == false);
                                                    let find_Value = Object.values(attribute['values']).find(v => v.selected == true && v.applyhidden == false && v.shouldhidden == false);
                
                                                    if (find_Value == undefined) {
                                                        self.markUnselected(attribute.id, v_id);
                                                        self.hideAttributeOrGroup(attribute.id);
                                                        self.hideAttribute(attribute.id);
                                                        self.unsetMsg(attribute.id);
                                                    } else if (find_selectedValue == undefined || (find_selectedValue && find_selectedValue.id !== attribute['values'][find_Value.id].parent_id)) {
                                                        self.markUnselected(attribute.id, v_id);
                                                        self.hideAttributeOrGroup(attribute.id);
                                                        self.hideAttribute(attribute.id);
                                                        self.unsetMsg(attribute.id);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                } else if (value.selected == true) {
                                    if (value.show == true) {
                                        if (value.child > 0) {
                                            self.showAttribute(a_id);
                                            let child_attribute = Object.values(self.attributeIdz).filter(a => a.parent_id == a_id && a.hide == 0);
                                            child_attribute.forEach(function(attribute) {
                                                let has_child_values = Object.values(attribute['values']).filter(v => v.parent_id == v_id);
                
                                                if (has_child_values.length) {
                                                    self.showAttribute(attribute.id);
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    });
                }
            }
        
            return response;
        },
        createCondition(conditionArray:any) {
            let newcondition = conditionArray['condition'];
            let appliedon = conditionArray['appliedon'];
        
            for (const con_aid in appliedon) {
                let findattrib = Object.values(this.attributeIdz).find((a) => a.id == con_aid);
                
                if (findattrib) {
                    if (
                        findattrib.type == this.TYPES['width'] || 
                        findattrib.type == this.TYPES['subwidth'] || 
                        findattrib.type == this.TYPES['height'] || 
                        findattrib.type == this.TYPES['subheight']
                    ) {
                        // Assuming `validate_fraction` is a function you've defined elsewhere
                        // let condition = validate_fraction(con_aid);
                        let fraction = '0.00'; // This needs to be updated with the correct value
        
                        let value = 0;
                        let vid = Object.keys(this.attributeIdz[findattrib.id]['values']);
                        if (vid != undefined && vid.length > 0) {
                            value = this.attributeIdz[findattrib.id]['values'][vid[0]].value;
                        }
        
                        newcondition = newcondition.replaceAll('attribute' + con_aid, value);
                    } else {
                        let findvalue = Object.values(findattrib['values']).find((fv) => fv.selected == true);
                        
                        if (findvalue) {
                            newcondition = newcondition.replaceAll('attribute' + con_aid, findvalue.id);
                        } else {
                            newcondition = newcondition.replaceAll('attribute' + con_aid, "'empty'");
                        }
                    }
                }
            }
        
            return newcondition;
        },
        getelement(classname:any)
        {
            var element = document.getElementsByClassName(classname);
            return element.length ? element[0]:undefined;
        },
        toggle(classname:any)
        {
            var element = document.getElementsByClassName(classname);
            return element.length ? element[0]:undefined;
        },
        getvalue(classname) {
            var element = document.getElementsByClassName(classname);
            return element.length ? element[0].value:undefined;
        },
        executeCondition(newcondition:any, c_aid:any, v_id:any, changed_values:any, msgValue:any, hiddenValues:any, child_Values:any, first_call:any, available:any = 1) {
            var selected_val = this.attributeIdz[c_aid]['values'][v_id];
            
            if (selected_val.selected == false) {
                if (eval(newcondition) == false) {
                    if (this.attributeIdz[c_aid]['values'][v_id]['applyhidden'] == false) {
                        changed_values[v_id] = this.attributeIdz[c_aid]['values'][v_id];
                    }
                    this.attributeIdz[c_aid]['values'][v_id]['applyhidden'] = true;
                    this.attributeIdz[c_aid]['values'][v_id]['shouldhidden'] = false;
        
                    this.markUnselected(c_aid, v_id);
                    this.hideAttributeOrGroup(c_aid);
        
                    let parent_attribute_id = c_aid;
                    let child_attribute = Object.values(this.attributeIdz).filter(a => a.parent == parent_attribute_id && a.hide == 0);
                    if (child_attribute.length > 0) {
                        child_attribute.forEach(attribute => {
                            let child_values = Object.values(attribute['values']).filter(v => v.parent_id == v_id);
                            child_Values[v_id] = {
                                v_id: v_id,
                                selected: false,
                                hide: true,
                                confirm_popup: false,
                                child: child_values.length
                            };
                        });
                    }
        
                } else {
                    let old_selected_value = this.attributeIdz[c_aid]['values'][v_id];
                    if (old_selected_value['applyhidden'] == true) {
                        hiddenValues[v_id] = { ...old_selected_value };
                    }
                    this.attributeIdz[c_aid]['values'][v_id]['applyhidden'] = false;
                    this.attributeIdz[c_aid]['values'][v_id]['shouldhidden'] = false;
        
                    let showTheValue = this.showValueAttributeOrGroup(c_aid, v_id);
        
                    if (showTheValue) {
                        let parent_attribute_id = c_aid;
                        let child_attribute = Object.values(this.attributeIdz).filter(a => a.parent == parent_attribute_id && a.hide == 0);
                        if (child_attribute.length > 0) {
                            child_attribute.forEach(attribute => {
                                let child_values = Object.values(attribute['values']).filter(v => v.parent_id == v_id);
                                child_Values[v_id] = {
                                    v_id: v_id,
                                    selected: false,
                                    show: true,
                                    confirm_popup: false,
                                    child: child_values.length
                                };
                            });
                        }
                    }
                }
            } else {
                if (eval(newcondition) == false) {
                    let old_selected_value = Object.values(this.attributeIdz[c_aid]['values']).find(v => v.oldselected == true && v.hide == 0 && v.shouldhidden == false && v.applyhidden == false);
        
                    if (old_selected_value == undefined) {
                        let old_selected_array = Object.values(this.attributeIdz[c_aid]['values']).filter(v => v.selected == false && v.hide == 0 && v.applyhidden == false && v.shouldhidden == false);
        
                        if (old_selected_array.length > 0) {
                            old_selected_array.sort((a, b) => a.sortorder - b.sortorder);
                            old_selected_value = old_selected_array[0];
                        }
                    }
        
                    if (old_selected_value !== undefined && this.attributeIdz[c_aid].hide == 0 && this.attributeIdz[c_aid].confirm_popup == true && first_call == false && available == 1) {
                        msgValue[v_id] = this.attributeIdz[c_aid]['values'][v_id];
                        let from = this.attributeIdz[c_aid]['values'][v_id].title;
                        let to = old_selected_value !== undefined ? old_selected_value.title : '';
        
                        if (this.msgStr[c_aid] !== undefined) {
                            const startPosition = this.msgStr[c_aid].lastIndexOf(' to ');
                            let replacementText = ' to ' + to + ', \n';
                            this.msgStr[c_aid] = this.msgStr[c_aid].slice(0, startPosition) + replacementText;
                        } else {
                            this.msgStr[c_aid] = this.attributeIdz[c_aid].title + ': ' + from + ' to ' + to + ', \n';
                        }
        
                        let parent_attribute_id = c_aid;
                        let child_attribute = Object.values(this.attributeIdz).filter(a => a.parent == parent_attribute_id && a.hide == 0);
                        if (child_attribute.length > 0) {
                            child_attribute.forEach(attribute => {
                                let from_has_child_values = Object.values(attribute['values']).filter(v => v.parent_id == v_id);
                                let to_has_child_values = Object.values(attribute['values']).filter(v => v.parent_id == old_selected_value.id);
        
                                child_Values[v_id] = {
                                    v_id: v_id,
                                    selected: false,
                                    hide: true,
                                    confirm_popup: true,
                                    child: from_has_child_values.length
                                };
        
                                child_Values[old_selected_value.id] = {
                                    v_id: old_selected_value.id,
                                    selected: true,
                                    show: true,
                                    confirm_popup: true,
                                    child: to_has_child_values.length
                                };
                            });
                        }
                    }
        
                    changed_values[v_id] = this.attributeIdz[c_aid]['values'][v_id];
                    this.attributeIdz[c_aid]['values'][v_id]['shouldhidden'] = true;
                    this.attributeIdz[c_aid]['values'][v_id]['applyhidden'] = true;
        
                } else {
                                       
                    this.attributeIdz[c_aid]['values'][v_id]['shouldhidden'] = false;
                    this.attributeIdz[c_aid]['values'][v_id]['applyhidden'] = false;
        
                    let showTheValue = this.showValueAttributeOrGroup(c_aid, v_id);
        
                    if (showTheValue) {
                        let parent_attribute_id = c_aid;
                        let child_attribute = Object.values(this.attributeIdz).filter(a => a.parent == parent_attribute_id && a.hide == 0);
                        if (child_attribute.length > 0) {
                            child_attribute.forEach(attribute => {
                                let child_values = Object.values(attribute['values']).filter(v => v.parent_id == v_id);
                                child_Values[v_id] = {
                                    v_id: v_id,
                                    selected: true,
                                    show: true,
                                    confirm_popup: false,
                                    child: child_values.length
                                };
                            });
                        }
                    }
                }
            }
        
            return {
                msgValue: msgValue,
                changed_values: changed_values,
                hiddenValues: hiddenValues,
                child_Values: child_Values,
            };
        },
        hideAttributeOrGroup ( c_aid:any) {
            var pick_first_value = '';
            var gid = '';
            var group_attributes = '';
            const self = this
            // find any select value if found we will not hide attribute and group
            let findSelectedValue = Object.values ( this.attributeIdz[ c_aid ][ 'values' ] ).filter ( v => ( v.selected == true && v.applyhidden == false && v.shouldhidden == false ) );

            // selected value in found retrun
            if ( findSelectedValue.length )
                return;

            gid = this.attributeIdz[ c_aid ].gid;

            let available_value_array = Object.values ( this.attributeIdz[ c_aid ][ 'values' ] ).filter ( v => ( v.selected == false && v.applyhidden == false && v.shouldhidden == false ) );

            //search any value which is not hidden and not selected
            // if found select it and return
            if ( available_value_array.length > 0 ) 
            {
                available_value_array.sort ( ( a, b ) => ( a.sortorder - b.sortorder ) )

                pick_first_value = available_value_array[ 0 ];
                this.attributeIdz[ c_aid ][ 'values' ][ pick_first_value.id ][ 'selected' ] = true;
                this.attributeIdz[ c_aid ][ 'values' ][ pick_first_value.id ][ 'oldselected' ] = false;
                if (this.attributeIdz[ pick_first_value.aid ].type == this.TYPES['width'] || this.attributeIdz[ pick_first_value.aid ].type == this.TYPES['subwidth'] || this.attributeIdz[ pick_first_value.aid ].type == this.TYPES['height'] || this.attributeIdz[ pick_first_value.aid ].type == this.TYPES['subheight'] )
                {
                    this.markInputSelected(pick_first_value.aid,pick_first_value.id,pick_first_value.value)
                }
                else
                {
                    this.markSelected(pick_first_value.aid,pick_first_value.id)
                }
                this.showAttribute(c_aid);
                this.showGroup(gid);

                // jQuery ( valueClass + pick_first_value.id ).addClass ( 'selected' );

                // jQuery ( valueClass + pick_first_value.id  ).prop ( 'checked', true );
                // jQuery ( document ).find ( '.CustomAttribute.attrib' + pick_first_value.aid ).val ( pick_first_value.id );
                // jQuery ( document ).find ( '.element-item-outputvalue-' + pick_first_value.aid ).html ( pick_first_value.title )
                // have we check the attributei hide==1 or not ? before showing the attribute

                return;
            }


            group_attributes = Object.values ( this.attributeIdz ).filter ( a => ( a.gid == gid && a.hide == 0 ) );

            // has only one attribute so hide the group
            if ( group_attributes.length == 1 ) {
                // jQuery ( attributeClass + c_aid ).val ( '' );
                this.hideGroup(gid)
                return
            }

            let hide_group = true;
            // if has multiple attributes
            // find if any selected value is found in any attribute
            // if find any selected value so
            group_attributes.forEach((attribute, index) => {
                let findSelectedValue = Object.values(self.attributeIdz[attribute.id]['values']).find(v => v.selected == true && v.applyhidden == false && v.shouldhidden == false);
            
                if (findSelectedValue !== undefined) {
                    hide_group = false;
                } else {
                    const element = document.querySelector(self.attributeClass + attribute.id);
                    if (element) {
                        element.value = ''; // Equivalent to jQuery's `.val('')`
                    }
                    self.hideAttribute(attribute.id);
                    self.unsetMsg(attribute.id);
                }
            });

            if ( hide_group ) {
                // jQuery ( attributeClass + c_aid ).val ( '' );
                // jQuery ( groupClass + gid ).hide ().addClass('hide_attribute');
                this.hideGroup(gid)
            } else {
                // jQuery ( attributeClass + c_aid ).val ( '' );
                // jQuery ( attributeClass + c_aid ).hide ();
                
                this.hideAttribute(c_aid)
                this.unsetMsg(c_aid) 

            }

        },
        unsetMsg(aid:any) 
        {
            if(Object.values(this.msgStr).length > 0 && this.msgStr[aid] != undefined)
            {
                delete this.msgStr[aid]
            }
            if(Object.values(this.pdpsummary).length > 0 && this.pdpsummary[aid] != undefined)
            {
                
                delete this.pdpsummary[aid]
            }
        },
        showValueAttributeOrGroup ( c_aid:any, v_id:any ) 
        {
            let gid = this.attributeIdz[ c_aid ].gid;

            // check parent child hierarchy
            let attr = this.attributeIdz[ c_aid ];
            // has parent
            if (attr.parent) 
            {
                
                let find_selectedValue = Object.values ( this.attributeIdz[ attr.parent ][ 'values' ] ).find ( v => ( v.selected == true && v.applyhidden == false && v.shouldhidden == false ) );
                if (find_selectedValue == undefined || (find_selectedValue && find_selectedValue.id != this.attributeIdz[ c_aid ]['values'][v_id].parent_id )) 
                {
                    this.markUnselected(c_aid,v_id)
                    this.hideAttributeOrGroup ( c_aid )

                    this.hideAttribute(c_aid)
                    this.unsetMsg(c_aid) 
                    return false;
                }
            }


            //show value or remove disabled
            // jQuery ( valueClass + v_id ).show ();
            this.showValue(c_aid,v_id)
            // markSelected(c_aid,v_id)

            // if ( == 0)
            // return ;
            if ( this.attributeIdz[ c_aid ].hide == 0 ) {
                // jQuery ( attributeClass + c_aid ).show ().removeClass('hide_attribute');
                this.showAttribute(c_aid)

                // jQuery ( groupClass + gid ).show ().removeClass('hide_attribute');
                this.showGroup(gid)
            }

            return true;
        },
        selectOneValue ( c_aid:any ) {
            var available_value_array = {};
            var available_selected_value = Object.values ( this.attributeIdz[ c_aid ][ 'values' ] ).find ( v => v.selected == true && v.shouldhidden == false && v.applyhidden == false )
            if ( available_selected_value != undefined ) {
                this.attributeIdz[ c_aid ][ 'values' ][ available_selected_value.id ][ 'oldselected' ] = false;
    
                this.setSummery(this.attributeIdz[ c_aid ],available_selected_value)
                if (this.attributeIdz[ available_selected_value.aid ].type == this.TYPES['width'] || this.attributeIdz[ available_selected_value.aid ].type == this.TYPES['subwidth'] || this.attributeIdz[ available_selected_value.aid ].type == this.TYPES['height'] || this.attributeIdz[ available_selected_value.aid ].type == this.TYPES['subheight'] )
                { 
                    this.markInputSelected(available_selected_value.aid,available_selected_value.id,available_selected_value.value)
                }
                else
                {
                    this.markSelected(available_selected_value.aid,available_selected_value.id)
    
                }
    
                return;
            }
    
            // find all attributes that are not hidden and not selected
            available_value_array = Object.values ( this.attributeIdz[ c_aid ][ 'values' ] ).filter ( v => v.selected == false && v.shouldhidden == false && v.applyhidden == false )
            // find all attributes that are not hidden and not selected
            if ( available_value_array.length > 0 ) {
                available_value_array = available_value_array.sort ( ( a, b ) => ( a.sortorder - b.sortorder ) )
                let pick_first_value = available_value_array[ 0 ];
    
                this.attributeIdz[ c_aid ][ 'values' ][ pick_first_value.id ][ 'selected' ] = true;
                this.attributeIdz[ c_aid ][ 'values' ][ pick_first_value.id ][ 'oldselected' ] = false;
    
                this.setSummery(this.attributeIdz[ c_aid ],pick_first_value)
                if (this.attributeIdz[ pick_first_value.aid ].type == this.TYPES['width'] || this.attributeIdz[ pick_first_value.aid ].type == this.TYPES['subwidth'] || this.attributeIdz[ pick_first_value.aid ].type == this.TYPES['height'] || this.attributeIdz[ pick_first_value.aid ].type == this.TYPES['subheight'] )
                { 
                    this.markInputSelected(pick_first_value.aid,pick_first_value.id,pick_first_value.value)
                }
                else
                {
                    this.markSelected(pick_first_value.aid,pick_first_value.id)
                }
    
            }
        },
        checkChangeAttributesMsg ( c_aid:any, msgAttributes:any, msgValue:any, selected_value_hidden:any, child_Values:any, first_call:any, available:any ) 
        {
            
            //find selected value
            var current_selected_value = Object.values ( this.attributeIdz[ c_aid ][ 'values' ] ).find ( v => ( v.selected == true && v.shouldhidden == false && v.applyhidden == false ) );
            var changed_aid = Object.keys ( msgAttributes ).find ( aid => ( aid == selected_value_hidden.aid ) );

            if ( changed_aid == undefined && current_selected_value != undefined && first_call == false ) 
            {
                let c_s_aid = current_selected_value.aid

                var changed_value = Object.values ( msgValue ).find ( v => ( v.id == selected_value_hidden.id ) );


                if ( changed_value == undefined && this.attributeIdz[ c_s_aid ].hide == 0 && this.attributeIdz[ c_s_aid ].confirm_popup == true && available == 1 ) 
                {
                    let newMsgStr = '';
                    let nfrom = this.attributeIdz[ selected_value_hidden.aid ][ 'values' ][ selected_value_hidden.id ].title
                    let nto = current_selected_value.title 
                    newMsgStr += this.attributeIdz[ c_s_aid ].title + ': ' + nfrom + ' to ' + nto + '\n';

                    if ( !this.msgStr[ selected_value_hidden.aid  ] != undefined ) 
                    {
                        this.msgStr[selected_value_hidden.aid]= newMsgStr

                       let parent_attribute_id = c_aid
                        var child_attribute = Object.values ( this.attributeIdz ).filter ( a => ( a.parent == parent_attribute_id && a.hide == 0 ) );
                        if ( child_attribute.length > 0 ) {
                            child_attribute.forEach((attribute, index) => {
                                // Check if there are any child values of this parent value
                                let from_has_child_values = Object.values(attribute['values']).filter(v => v.parent_id == selected_value_hidden.id);
                                let to_has_child_values = Object.values(attribute['values']).filter(v => v.parent_id == current_selected_value.id);
                            
                                child_Values[current_selected_value.id] = {
                                    v_id: current_selected_value.id,
                                    selected: true,
                                    confirm_popup: true,
                                    show: true,
                                    child: to_has_child_values.length
                                };
                                child_Values[selected_value_hidden.id] = {
                                    v_id: selected_value_hidden.id,
                                    selected: false,
                                    confirm_popup: true,
                                    hide: true,
                                    child: from_has_child_values.length
                                };
                            });
                        }

                    }

                }
            }else{

                
                if(current_selected_value != undefined &&  Object.values(this.msgStr).length > 0 && this.msgStr[c_aid] != undefined )
                {
                    let nto = current_selected_value.title 

                    const startPosition = this.msgStr[c_aid].lastIndexOf(' to ');
                    let replacementText = ' to ' + nto +', \n';
                    this.msgStr[c_aid] = this.msgStr[c_aid].slice(0, startPosition) + replacementText;


                }

            }

            return {
                child_Values: child_Values,

            }
        },
        confirmChange(changed_attribs:any, hiddenAttributes:any, aid:any, paid:any = '') {
            const self = this
            let popUpMsg = Object.values(this.msgStr).join('');
            var confirm_change = confirm(this.With_this_selection_following_selections_will_be_changed + popUpMsg);
            if (!confirm_change) {
                
                Object.keys(hiddenAttributes).forEach(o_aid => {
                    let o_values = hiddenAttributes[o_aid];
                    if (changed_attribs[o_aid] == undefined && self.attributeIdz[o_aid].hide == 0) {
                        Object.keys(o_values).forEach(o_vid => {
                            let o_value = o_values[o_vid];
                            let f_value = self.attributeIdz[o_aid]['values'][o_value.id];
        
                            if (f_value !== undefined) {
                                self.attributeIdz[o_value.aid]['values'][o_value.id].applyhidden = o_value.applyhidden;
                                self.attributeIdz[o_value.aid]['values'][o_value.id].shouldhidden = o_value.shouldhidden;
                                self.attributeIdz[o_value.aid]['values'][o_value.id].selected = o_value.selected;
        
                                if (o_value.selected == false) {
                                    self.markUnselected(o_aid, f_value.id);
                                    self.hideAttributeOrGroup(o_aid);
                                }
                            }
                        });
                    } else {
                        Object.keys(o_values).forEach(o_vid => {
                            let o_value = o_values[o_vid];
                            let isselect_value = self.attributeIdz[o_aid]['values'][o_value.id];
        
                            if (isselect_value !== undefined && isselect_value.selected == false && o_value.oldselected == false && o_value.applyhidden == true) {
                                self.attributeIdz[o_value.aid]['values'][o_value.id].applyhidden = false;
                                self.attributeIdz[o_value.aid]['values'][o_value.id].shouldhidden = false;
        
                                if ([self.TYPES['swatch'], self.TYPES['drop-down'], self.TYPES['style']].includes(self.attributeIdz[o_aid].type)) {
                                    self.attributeIdz[o_value.aid]['values'][o_value.id].selected = false;
                                }
        
                                self.markUnselected(o_aid, isselect_value.id);
                            }
                        });
                    }
                });
        
                Object.keys(changed_attribs).forEach(o_aid => {
                    let o_values = changed_attribs[o_aid];
                    Object.keys(o_values).forEach(o_vid => {
                        let o_value = o_values[o_vid];
                        let f_value = self.attributeIdz[o_aid]['values'][o_value.id];
        
                        if (f_value !== undefined) {
                            if (f_value.applyhidden == true) {
                                self.attributeIdz[o_value.aid]['values'][o_value.id].applyhidden = false;
                                self.attributeIdz[o_value.aid]['values'][o_value.id].shouldhidden = false;
                                self.showValueAttributeOrGroup(o_aid, o_value.id);
                            }
        
                            if (f_value.oldselected == true) {
                                let selected_value = Object.values(self.attributeIdz[o_aid]['values']).find(v => v.selected == true && v.shouldhidden == false && v.applyhidden == false);
        
                                if (selected_value !== undefined) {
                                    if ([self.TYPES['swatch'], self.TYPES['drop-down'], self.TYPES['style']].includes(self.attributeIdz[o_aid].type)) {
                                        self.attributeIdz[o_aid]['values'][selected_value.id].selected = false;
                                        self.attributeIdz[o_aid]['values'][selected_value.id].oldselected = true;
                                    }
        
                                    self.attributeIdz[o_aid]['values'][selected_value.id].shouldhidden = false;
                                    self.attributeIdz[o_aid]['values'][selected_value.id].applyhidden = false;
        
                                    const element = document.querySelector(self.attributeClass + o_aid + ' [data-value="' + selected_value.id + '"]');
                                    if (element) {
                                        element.removeAttribute('selected');
                                        element.checked = false;
                                        element.classList.remove('active');
                                    }
        
                                    let hidden_attribute = hiddenAttributes[o_aid];
                                    let hidden_value;
                                    if (hidden_attribute !== undefined) {
                                        hidden_value = Object.values(hiddenAttributes[o_aid]).find(v => v.id == selected_value.id);
                                        if (hidden_value !== undefined) {
                                            self.attributeIdz[o_aid]['values'][selected_value.id].shouldhidden = hidden_value.shouldhidden;
                                            self.attributeIdz[o_aid]['values'][selected_value.id].applyhidden = hidden_value.applyhidden;
                                            self.markUnselected(o_aid, selected_value.id);
                                        }
                                    }
                                }
        
                                self.attributeIdz[o_value.aid]['values'][o_value.id].selected = true;
                                self.attributeIdz[o_value.aid]['values'][o_value.id].oldselected = false;
        
                                if ([self.TYPES['width'], self.TYPES['subwidth'], self.TYPES['height'], self.TYPES['subheight']].includes(self.attributeIdz[o_value.aid].type)) {
                                    self.markInputSelected(o_value.aid, o_value.id, o_value.value);
                                } else {
                                    self.markSelected(o_value.aid, o_value.id);
                                }
                            }
                        }
                    });
                });
        
                let clicked_vid = Object.values(this.attributeIdz[aid]['values']).find(v => v.selected == true && v.shouldhidden == false && v.applyhidden == false);
                let before_clicked_vid = Object.values(this.attributeIdz[aid]['values']).find(v => v.oldselected == true && v.shouldhidden == false && v.applyhidden == false);
        
                if (clicked_vid !== undefined) {
                    if ([this.TYPES['swatch'], this.TYPES['drop-down'], this.TYPES['style']].includes(this.attributeIdz[aid].type)) {
                        this.attributeIdz[aid]['values'][clicked_vid.id].selected = false;
                        this.attributeIdz[aid]['values'][clicked_vid.id].oldselected = true;
                    }
        
                    this.attributeIdz[aid]['values'][clicked_vid.id].applyhidden = false;
                    this.attributeIdz[aid]['values'][clicked_vid.id].shouldhidden = false;
        
                    this.unsetSummery(aid);
        
                    const element = document.querySelector(this.attributeClass + aid + ' [data-value="' + clicked_vid.id + '"]');
                    if (element) {
                        element.removeAttribute('selected');
                        element.checked = false;
                        element.classList.remove('active');
                    }
        
                    if ([this.TYPES['width'], this.TYPES['subwidth'], this.TYPES['height'], this.TYPES['subheight']].includes(this.attributeIdz[aid].type)) {
                        this.attributeIdz[aid]['values'][clicked_vid.id]['value'] = parseFloat(clicked_vid.ovalue);
                        document.querySelector(this.attributeClass + aid).value = parseFloat(clicked_vid.ovalue);
                        this.setSummery(this.attributeIdz[aid], clicked_vid);
                    }
                }
        
                if (before_clicked_vid !== undefined) {
                    this.attributeIdz[aid]['values'][before_clicked_vid.id].selected = true;
                    this.attributeIdz[aid]['values'][before_clicked_vid.id].oldselected = false;
                    this.attributeIdz[aid]['values'][before_clicked_vid.id].applyhidden = false;
                    this.attributeIdz[aid]['values'][before_clicked_vid.id].shouldhidden = false;
        
                    if ([this.TYPES['width'], this.TYPES['subwidth'], this.TYPES['height'], this.TYPES['subheight']].includes(this.attributeIdz[aid].type)) {
                        this.markInputSelected(aid, before_clicked_vid.id, before_clicked_vid.value);
                    } else {
                        this.markSelected(aid, before_clicked_vid.id);
                    }
        
                    this.setSummery(this.attributeIdz[aid], before_clicked_vid);
                }
        
                if (paid !== undefined && paid !== '') {
                    let clicked_pvid = Object.values(this.attributeIdz[paid]['values']).find(v => v.selected == true && v.shouldhidden == false && v.applyhidden == false);
                    let before_clicked_pvid = Object.values(this.attributeIdz[paid]['values']).find(v => v.oldselected == true && v.shouldhidden == false && v.applyhidden == false);
        
                    if (clicked_pvid !== undefined) {
                        if ([this.TYPES['swatch'], this.TYPES['drop-down'], this.TYPES['style']].includes(this.attributeIdz[aid].type)) {
                            this.attributeIdz[aid]['values'][clicked_pvid.id].selected = false;
                            this.attributeIdz[aid]['values'][clicked_pvid.id].oldselected = true;
                        }
        
                        this.attributeIdz[aid]['values'][clicked_pvid.id].applyhidden = false;
                        this.attributeIdz[aid]['values'][clicked_pvid.id].shouldhidden = false;
        
                        const element = document.querySelector(this.attributeClass + aid + ' [data-value="' + clicked_pvid.id + '"]');
                        if (element) {
                            element.removeAttribute('selected');
                            element.checked = false;
                            element.classList.remove('active');
                        }
                    }
        
                    if (before_clicked_pvid !== undefined) {
                        this.attributeIdz[aid]['values'][before_clicked_pvid.id].selected = true;
                        this.attributeIdz[aid]['values'][before_clicked_pvid.id].oldselected = false;
                        this.attributeIdz[aid]['values'][before_clicked_pvid.id].applyhidden = false;
                        this.attributeIdz[aid]['values'][before_clicked_pvid.id].shouldhidden = false;
        
                        if ([this.TYPES['width'], this.TYPES['subwidth'], this.TYPES['height'], this.TYPES['subheight']].includes(this.attributeIdz[aid].type)) {
                            this.markInputSelected(aid, before_clicked_pvid.id, before_clicked_pvid.value);
                        } else {
                            this.markSelected(aid, before_clicked_pvid.id);
                        }
                    }
                }
        
                return false;
            }
        
            return true;
        },
        sqrunitprice(price:any,width:any,height:any,unit_relative:any) {
        var unitSqr = 0;
        var unit_relative = unit_relative == undefined || unit_relative == 0 || unit_relative == '' || unit_relative == null ? 1 : unit_relative;

        let widthSqr  = parseFloat(width) / unit_relative;
        let heightSqr = parseFloat(height)  / unit_relative;
        unitSqr = parseFloat(widthSqr) * parseFloat(heightSqr) ;
        unitSqr = Math.round(unitSqr * 100) / 100;
        return parseFloat(unitSqr) * parseFloat(price)
        },
        sqrmeasureprice(price:any,measurement:any,unit_relative:any) {
        var unitSqr = 0;
        var unit_relative = unit_relative == undefined || unit_relative == 0 || unit_relative == '' || unit_relative == null ? 1 : unit_relative;
        unitSqr = parseFloat(measurement) / unit_relative ;
        unitSqr = Math.round(unitSqr * 100) / 100;
        return parseFloat(unitSqr) * parseFloat(price)
        },
        closest (num:any, arr:any) 
        {
            var mid;
            var lo = 0;
            var hi = arr.length - 1;
            while (hi - lo > 1) {
                mid = Math.floor ((lo + hi) / 2);
                if (arr[mid] < num) {
                    lo = mid;
                } else {
                    hi = mid;
                }
            }
            if (lo==0 && hi==1) 
            { 
                if(num <= arr[lo])
                {
                    return arr[lo];
                }
                return arr[hi];

            }
            return arr[hi];
        },
        lookupprice(price:any,width:any=null,height:any=null) 
        {
            if (typeof(price) == null) {
                return 0;
            }
            if (price==undefined) 
                {
                return 0;
                }
            if (width==null && height==null) 
            {
                return price;
            }
                
                let dropz = Object.keys(price);
                
                dropz = dropz.map(Number);
                dropz = dropz.sort((a, b) => a - b);
                
                let drop  = dropz.indexOf(height);
                
                if (drop == -1) 
                {
                height = this.closest(height,dropz);
                }else{
                    height = dropz[drop]
                }
                
                let fabprice = price[height];
                
                if (fabprice==undefined) 
                {
                return 0;
                }
                let widthz = Object.keys(fabprice);
                widthz = widthz.map(Number);
                widthz = widthz.sort((a, b) => a - b);
                let widthindex  = widthz.indexOf(width);
                if (widthindex == -1) 
                {
                    width = this.closest(width,widthz);
                }else{
                    width = widthz[widthindex];
                }

            return parseFloat(fabprice[width]);
        
        },
        swatchimage()
        {
            return false;
            let overlayimages = [];
            let findstyleswatch = Object.values(this.attributeIdz).filter(a => (a.type == this.TYPES['style'] || a.type == this.TYPES['swatch']) && a.generate_swatches);
        
            if (findstyleswatch.length) {
                findstyleswatch = findstyleswatch.sort((a, b) => (a.gsortorder - b.gsortorder) || (a.sortorder - b.sortorder));
        
                findstyleswatch.forEach(attribute => {
                    const value = Object.values(attribute['values']).find(v => v.selected == true && v.shouldhidden == false && v.applyhidden == false && v.overlay_image !== '');
                    if (value !== undefined) {
                        overlayimages.push(value.overlay_image);
                    }
                });
        
                if (findstyleswatch.length !== overlayimages.length) {
                    overlayimages = [];
                }
        
                if (overlayimages.length) {
                    if (typeof this.useBackground !== 'undefined' && this.useBackground == true) {
                        document.querySelector(this.imageElement).style.backgroundImage = `url("${overlayimages[0]}")`;
                    } else {
                        const swiperWrapper = document.querySelector('.blind_gallery .swiper-wrapper');
                        if (swiperWrapper) {
                            swiperWrapper.querySelectorAll('.overlaymiage').forEach(element => element.remove());
        
                            const firstSlide = swiperWrapper.querySelector('.firstslide');
                            if (firstSlide) {
                                swiperWrapper.prepend(firstSlide);
                                firstSlide.classList.remove('d-none');
                            }
        
                            document.querySelector(this.imageElement).setAttribute('src', overlayimages[0]);
        
                            if (overlayimages.length > 1) {
                                for (let i = 1; i < overlayimages.length; i++) {
                                    const overlayDiv = document.createElement('div');
                                    overlayDiv.className = 'overlaymiage';
                                    overlayDiv.style.position = 'absolute';
                                    overlayDiv.style.top = '0';
                                    overlayDiv.style.left = '0';
                                    overlayDiv.style.width = '100%';
                                    overlayDiv.style.height = '100%';
        
                                    const imgElement = document.createElement('img');
                                    imgElement.style.width = '100%';
                                    imgElement.src = overlayimages[i];
                                    imgElement.alt = '';
        
                                    overlayDiv.appendChild(imgElement);
                                    swiperWrapper.insertBefore(overlayDiv, document.querySelector(this.imageElement).nextSibling);
                                }
                            }
                        }
                    }
                } else {
                    const firstSlide = document.querySelector('.blind_gallery .swiper-wrapper .firstslide');
                    if (firstSlide) {
                        firstSlide.remove();
                    }
                }
            }
        },
        getMeasurement(attribute_type) {
            let value = 0;
            let findvalue = Object.values ( this.attributeIdz ).find ( ( a ) => a.type == attribute_type )
            if ( findvalue != undefined )
            {
               let vid = Object.keys(this.attributeIdz[ findvalue.id ][ 'values' ]);
                if (vid != undefined)
                {
                    value = this.attributeIdz[ findvalue.id ][ 'values' ][vid].value
                }
            }

            if (value == undefined || isNaN(value) || value=='' || value < 0)
            {
                value = 0
            }
            value = parseFloat(value)
            return value;
        },
        getMeasurementByID(attribute_id) {
            let value = 0;
            let findvalue = Object.values ( this.attributeIdz ).find ( ( a ) => a.id == attribute_id )
            if ( findvalue != undefined )
            {
                let vid = Object.keys(this.attributeIdz[ findvalue.id ][ 'values' ]);
                if (vid != undefined)
                {
                    value = this.attributeIdz[ findvalue.id ][ 'values' ][vid].value
                }
            }

            if (value == undefined || isNaN(value) || value=='' || value < 0)
            {
                value = 0
            }
            value = parseFloat(value)
            return value;
        },
        getSubHeights() {
            return Object.values ( this.attributeIdz ).filter ( ( a ) => a.type == this.TYPES['subheight'] && a.linkto !== null)
        },
        getSubWidths(){
            return Object.values ( this.attributeIdz ).filter ( ( a ) => a.type == this.TYPES['subwidth']  && a.linkto !== null)
        },
        calculateMultiPrice(width,height,value,subWidths,subHeights) {


            let total = 0;
            let sub_height =0;
            let sub_width = 0;
            // calculate multiprice base on subwidths
            if (subWidths.length != 0 )
            {
                for (let index = 0; index < subWidths.length; index++)
                {
                    sub_height = sub_width = 0
                    sub_width = this.getMeasurementByID(subWidths[index].id)
                    if (!sub_width || sub_width <=0) {
                        continue;
                    }
                    if (subWidths[index].linktotype ==  this.TYPES['height'])
                    {
                        sub_height = height
                    }else if(subWidths[index].linktotype ==  this.TYPES['subheight'])
                    {
                        sub_height = this.getMeasurementByID(subWidths[index].linkto)
                    }
        
                    total = parseFloat(total) +  this.getValuePrice(value.price_type,sub_width,sub_height,this.PRICETYPE,value.price,this.lookupprices[value.id])
        
        
                }
            }else {
        
                // calculate multiprice base on subHeights
                for (let index = 0; index < subHeights.length; index++)
                {
                    sub_width = 0
                    sub_height = this.getMeasurementByID(subHeights[index].id)
                    if (!sub_height || sub_height <=0) {
                        continue;
                    }
        
                    if (subHeights[index].linktotype ==  this.TYPES['width'])
                    {
                        sub_width = width
                    }else if( subHeights[index].linktotype ==  this.TYPES['subwidth'])
                    {
                        sub_width = this.getMeasurementByID(subHeights[index].linkto)
                    }
                    total = parseFloat(total) +  this.getValuePrice(value.price_type,sub_width,sub_height,this.PRICETYPE,value.price,this.lookupprices[value.id])
        
        
                }
        
            }
        
            return total
        },
        getValuePrice(price_type,width,height,PRICE_TYPES,price,priceArray) {
            if (price_type == PRICE_TYPES['unit-price'])
            {
                return parseFloat(price)
            }
            else if (price_type == PRICE_TYPES['grid'] || price_type == PRICE_TYPES['grouppricing'])
            {
                return parseFloat(this.lookupprice(priceArray,width,height))
            }
            else if (price_type == PRICE_TYPES['widthlookup'] && width > 0)
            {
                return parseFloat(this.lookupprice(priceArray,width,height))
            }
            else if (price_type == PRICE_TYPES['heightlookup'] && height > 0)
            {
                return parseFloat(this.lookupprice(priceArray,width,height))
            }
            else if (price_type == PRICE_TYPES['sqr-meter'])
            {
                return parseFloat(this.sqrunitprice(price,width,height,this.UNIT_RELATIVE[PRICE_TYPES['sqr-meter']]))
            }
            else if (price_type == PRICE_TYPES['sqr-feet'])
            {
                return parseFloat(this.sqrunitprice(price,width,height,this.UNIT_RELATIVE[PRICE_TYPES['sqr-feet']]))
            }
            else if (price_type == PRICE_TYPES['widthfeet']  && width > 0)
            {
                return parseFloat(this.sqrunitprice(price,width,height,this.UNIT_RELATIVE[PRICE_TYPES['widthfeet']]))
            }
            else if (price_type == PRICE_TYPES['heightfeet'] && height > 0)
            {
                return parseFloat(this.sqrunitprice(price,width,height,this.UNIT_RELATIVE[PRICE_TYPES['heightfeet']]))
            }
            else if (price_type == PRICE_TYPES['width'] && width > 0)
            {
                return parseFloat(this.sqrmeasureprice(price,width,this.UNIT_RELATIVE[PRICE_TYPES['width']]))
            }
            else if (price_type == PRICE_TYPES['height'] && height > 0)
            {
                return parseFloat(this.sqrmeasureprice(price,height,this.UNIT_RELATIVE[PRICE_TYPES['height']]))
            }
            return parseFloat(0);
        },
        calculatePrice() {
            let width = this.getMeasurement(this.TYPES['width']);
            let height = this.getMeasurement(this.TYPES['height']);

            
            let calculate_MultiPrice= false;
            // subwidth that has link to drop or subdrop
            let subWidths =this.getSubWidths();
            // subdrop that has link to width or subwidth
            let subHeights = this.getSubHeights()

            let noOfSubWidths = subWidths.length;
            let noOfSubdrops = subHeights.length;
            // no subwith and subdrop return 0
            if (noOfSubdrops != 0  || noOfSubWidths != 0) {
                calculate_MultiPrice = true;
            }

            // let multiprice = calculateMultiPrice(width,height);

            let actual_price = parseFloat(this.BASEPRICE);
            let total = 0;
            let attributes = Object.values ( this.attributeIdz ).filter ( a => ( a.price_applicable == true ) )

            for (var index in attributes)
            {
                var value = Object.values ( attributes[index][ 'values' ] ).find ( v => v.selected == true && v.applyhidden == false && v.shouldhidden == false && (v.price_type != '0' && v.price_type != null && v.price_type != '' ))
                if (value != undefined)
                {
                    if (attributes[index].parent_id)
                    {
                        let find_selectedValue = Object.values ( this.attributeIdz[ attributes[index].parent_id ][ 'values' ] ).find ( v => ( v.selected == true && v.applyhidden == false && v.shouldhidden == false ) );
                        if (find_selectedValue == undefined || (find_selectedValue && find_selectedValue.id != attributes[index]['values'][value.id].parent_id ))
                        {
                            continue;
                        }

                    }
                    if (attributes[index].multiprice == true && calculate_MultiPrice == true)
                    {
                        total = parseFloat(total) +  this.calculateMultiPrice(width,height,value,subWidths,subHeights)
                    }else{
                        total = parseFloat(total) +  this.getValuePrice(value.price_type,width,height,this.PRICETYPE,value.price,this.lookupprices[value.id])
                    }
                }
            }


            actual_price = total;
            let rrprice =0;
            if (Object.values(this.DISCOUNTS).length)
            {
                let discount =this.DISCOUNTS[this.B2BTYPE] != undefined ?  this.DISCOUNTS[this.B2BTYPE] : 0;

                total = parseFloat(total) - (parseFloat(total) * parseFloat(discount) / 100);
            }

            let promotionDiscount=0;
            if(this.promotionSettings !=undefined && this.promotionSettings.promotion !=undefined && this.promotionSettings.promotion == true)
            {
                if (this.promotionSettings.promotiontype == 3)
                {
                    for (var i = this.promotionSettings.rules.length - 1; i >= 0; i--) {
                        let rule = this.promotionSettings.rules[i]

                        if(rule.discounttype != undefined || rule.discount !=undefined)
                        {
                            promotionDiscount += this.calculateDiscount(rule.discounttype,rule.discount,total)

                        }
                    }
                }
                if (parseFloat(total)  - parseFloat(promotionDiscount) > 0)
                {
                    total = parseFloat(total)  - parseFloat(promotionDiscount);
                }
            }

            if (this.USEBASEPRICE && parseFloat(total) < parseFloat(this.BASEPRICE))
            {
                total = parseFloat(this.BASEPRICE);
            }




            // document.querySelector(this.rrpriceWrapper).style.display = 'none';

            if (parseFloat(actual_price) > parseFloat(total)) {
                this.productDiscountedPrice = actual_price.toFixed(2);
                // document.querySelector(this.rrpriceWrapper).style.display = '';
                // document.querySelector(this.rrpriceWrapper+' span').innerHTML = actual_price.toFixed(2);
                // this.productPrice = actual_price.toFixed(2)
                // total = rrprice
            }else{
                this.productDiscountedPrice = 0;
            }

            document.querySelector(this.priceClass).innerHTML = total.toFixed(2);
            this.productPrice = total.toFixed(2);

        },
        calculateDiscount(discounttype,discount,price) {
            if (discounttype == 2) // peraccount discount
            {
                discount = ( parseFloat(price) * parseFloat(discount / 100) );
                if (price - discount < 0)
                    return 0;
                return parseFloat(discount);

            }else if (discounttype == 3)
            {
                if (price - discount < 0)
                    return price;

                return parseFloat(discount);
            }
            return 0;
        },
        calculateservicePrice() {
            const self = this
            if (typeof this.servicePriceSetting == 'undefined') {
                document.querySelector('.serviceprice').innerHTML = '0.00';
                return;
            }
        
            let width = this.getMeasurement(this.TYPES['width']);
            let height = this.getMeasurement(this.TYPES['height']);
        
            if (height == undefined || isNaN(height) || height == '' || height < 0) {
                height = 0;
            }

            if (width == undefined || isNaN(width) || width == '' || width < 0) {
                width = 0;
            }
        
            let total = 0;
        
            if (this.sevice_price_type == this.servicePriceSetting['types']['custom']) {
                
                Object.keys(this.servicePriceSetting['pricelist']).forEach(aid => {
                    let values = self.servicePriceSetting['pricelist'][aid];
                    let selected_val = Object.values(self.attributeIdz[aid]['values']).find(v => v.selected == true);
                    if (selected_val !== undefined && values[selected_val.id] !== undefined) {
                        total += parseFloat(values[selected_val.id]);
                    }
                });
            } else {
                total += this.getValuePrice(
                    this.sevice_price_type,
                    width,
                    height,
                    this.servicePriceSetting['types'],
                    this.servicePriceSetting['serviceprice'],
                    this.servicePriceSetting['pricelist']
                );
            }
        
            document.querySelector('.serviceprice').innerHTML = parseFloat(total).toFixed(2);
        }
    },
});
