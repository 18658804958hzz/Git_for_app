import React,{Component} from 'react';
import ReactDom from 'react-dom';

import { Row,Col,Button,DatePicker,Input,Upload, message, Icon,Select,Checkbox,Radio,Cascader,Modal,Tree,Affix,Tabs } from 'antd';
const {TextArea}=Input;
const Option=Select.Option;
const CheckboxGroup=Checkbox.Group;
const RadioGroup=Radio.Group;
const TreeNode=Tree.TreeNode;
const Search=Input.Search;
const TabPane=Tabs.TabPane;
import $ from 'jquery';
import './main.css';

// 用作组件key的唯一标识
var key=0;
// 全局变量，用于记录当前拖拽对象的参数。
var globalParams='';

// 附件上传；
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};

// 下拉选框
function selectChange(value) {
    console.log(`selected ${value}`);
}

function selectBlur() {
    console.log('blur');
}

function selectFocus() {
    console.log('focus');
}
// 复选框
const checkboxOptions = ['Apple', 'Pear'];
const checkboxDefault= ['Apple'];
class Checkbox2 extends Component {
    state = {
        checkedList: checkboxDefault,
        indeterminate: true,
        checkAll: false,
    };
    onChange = (checkedList) => {
        this.setState({
        checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < checkboxOptions.length),
        checkAll: checkedList.length === checkboxOptions.length,
        });
    }
    onCheckAllChange = (e) => {
        this.setState({
        checkedList: e.target.checked ? checkboxOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
        });
    }
    render() {
        return (
        <span style={{width:'70%'}}>
            <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
            >
                全选 
            </Checkbox>
            <CheckboxGroup options={checkboxOptions} value={this.state.checkedList} onChange={this.onChange} />
        </span>
        );
    }    
}
// 下拉级联：
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hanzhou',
        children: [{
        value: 'xihu',
        label: 'West Lake',
        }],
    }]
    }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
        }],
    }],
}];

function cascaderChange(value) {
  console.log(value);
}

// 下拉树 数据
const treeData = [{
    title: '0-0',
    key: '0-0',
    children: [{
        title: '0-0-0',
        key: '0-0-0',
        children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
        ],
    }, {
        title: '0-0-1',
        key: '0-0-1',
        children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
        ],
    }, {
        title: '0-0-2',
        key: '0-0-2',
    }],
}, {
    title: '0-1',
    key: '0-1',
    children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
    ],
}, {
    title: '0-2',
    key: '0-2',
}];
class Tree2 extends Component{
    state = {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: false,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
    }    
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
        expandedKeys,
        autoExpandParent: false,
        });
    }
    
    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }
    
    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    }
    
    renderTreeNodes = (data) => {
        return data.map((item) => {
        if (item.children) {
            return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
            </TreeNode>
            );
        }
        return <TreeNode {...item} />;
        });
    }
    
    render() {
        return (
            <span  style={{width:'70%',textAlign:'left',display:'inline-block'}}>
                <Tree 
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>            
            </span>                
        );
    }
}
// 级联平铺
class Cascader_x2 extends Component{
    constructor(args){
        super(args);
        this.state={
            tabPosition:'left',
            data:{
                time:{
                    '年':[
                        '今年','去年','更早'
                    ],
                    '月':[
                        '当月','上月','近5月'
                    ],
                    '日':[
                        '今日','昨天','近5天'
                    ]           
                },
                state:{
                    '待办':[
                        '朝阳','昌平','顺义'
                    ],
                    '已办':[
                        '朝阳','昌平','顺义'
                    ],
                    '在办':[
                        '朝阳','昌平','顺义'
                    ]
                },
                addr:{
                    '昆明':[
                        '盘龙','官渡','五华'
                    ],
                    '南京':[
                        '玄武','秦淮','鼓楼'
                    ],
                    '北京':[
                        '朝阳','昌平','顺义'
                    ]
                }

            }
        }
    }
    onclick(v){
        console.log(v.join('<'));
    }
    render(){
        var data=this.state.data;
        var ele={};
        var count=0;
        for(var v1 in data){ // v1:time state addr
            ele[v1]=[];
            for(var v2 in data[v1]){ // v2 昆明 南京 北京
                var li=[];
                li.push(<li key={v2+(count++)}>{v2}</li>);
                data[v1][v2].forEach((v3,k3)=>{ // v3 '朝阳','昌平','顺义'
                    var params=[v1,v2,v3];
                    li.push(
                        <li key={k3} onClick={()=>{this.onclick(params)}}>{v3}</li>
                    );
                });
                ele[v1].push(<ul key={v1+(count++)}>{li}</ul>);
            }            
        }
        console.log(ele);
        return ( 
            <span  style={{width:'70%',textAlign:'left',display:'inline-block',position:'absolute'}}>
                <Tabs tabPosition={this.state.tabPosition}>
                    <TabPane tab="时间" key="1">
                        {ele.time.map((arr)=>{
                            return arr;
                        })}
                    </TabPane>
                    <TabPane tab="状态" key="2">
                        {ele.state.map((arr)=>{
                            return arr;
                        })}
                    </TabPane>
                    <TabPane tab="地点" key="3">
                        {ele.addr.map((arr)=>{
                            return arr;
                        })}
                    </TabPane>
                </Tabs>
            </span> 
        )
    }
}
class DatePicker2 extends Component{
    change(v){
        console.log(v);
    }
    render(){
        return (                                                               
            <DatePicker style={{width:'70%'}} onChange={this.change} />            
        )
    }
}
const Title2=()=><span style={{fontSize:20,fontWeight:600,letterSpacing:3,width:'70%',display:'inline-block',textAlign:'left'}}>案件登记</span>;
const Input2=()=><Input style={{width:'70%'}} placeholder='相关描述' />;

const Textarea2=()=><TextArea style={{width:'70%'}} placeholder='案件详情描述' autosize={{ minRows: 2, maxRows: 6 }} />;
const Upload2=()=>{
    return (
        <Upload {...props} style={{height:32}}>
            <Button><Icon type="upload" /> 上传案件资料 </Button>
        </Upload>
    )
}
const Radio2=()=>{
    return (
        <RadioGroup name='radio' defaultValue={2}>
            <Radio value={1} > A </Radio>
            <Radio value={2} > B </Radio>
            <Radio value={3} > C </Radio>
        </RadioGroup>
    )
}
const Cascader2=()=><Cascader style={{width:'70%'}} options={options} onChange={cascaderChange} changeOnSelect /> ;
const Select2=()=>{
    return (
        <Select 
            showSearch
            style={{ width: '70%' }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={selectChange}
            onFocus={selectFocus}
            onBlur={selectBlur}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>
    )
}
//  模态框
class Modal2 extends React.Component {
    constructor(props){
        super();
        this.state = {            
            visible:false,
            params:{
                label:false,name:false,required:false,
                readonly:false,disabled:false,is_show:false,
                dataSource:false,valiDate:false,config:false
            },
            spanTitleEle:''
        }
        this.selectVal='';
    } 
    componentWillReceiveProps(props){
        //console.log(props);
        var _this=this;
        var params=this.state.params;
        for(var v in params){
            params[v]=false;
        }
        props.params.forEach((v,k)=>{
            params[v]=true;
        });
        _this.setState({
            params,
            spanTitleEle:props.spanTitleEle,
            visible:props.showFlag
        });  
    }     
    handleOk = (e) => {
        //console.log(e,'handleOk',this);
        this.props.modalOk();          
        var json={};
        $('.dragOverActive').removeClass('dragOverActive');
        $(".attr td").each((k,v)=>{
            if(v.style.display!='none'){
                var className=v.getAttribute('class');
                // 'required','readonly','disabled','is_show','dataSource','valiDate','label','name','config'
                if('required,readonly,disabled,is_show'.indexOf(className)!=-1){
                    json[className]=v.children[0].checked?true:false;
                }else if('dataSource,valiDate,label'.indexOf(className)!=-1){
                    json[className]=v.children[0].value;
                }else if(className=='name'){
                    json[className]=this.selectVal;
                }else{
                    json[className]=[];
                    [...v.children].forEach((v2,k2)=>{
                        json[className].push(v2.value);
                    });
                } 
            }            
        });        
        if($(this.state.spanTitleEle).parent().attr('class')=='component title'){
            // 右侧的标题组件赋值；
            $('.right .title').find('span').eq(1).html(json.label);
        }else{
            if(json.label!='')this.state.spanTitleEle.innerHTML=json.label+' ：';
        }        
        this.state.spanTitleEle.setAttribute('config',JSON.stringify(json).replace(/\"/g,"'"));
    }
  
    handleCancel = (e) => {
        console.log(e,'handleCancel');
        this.props.modalCancel();
    }
    showModal(){ // 目前没有调用
        //console.log('showModal');
        // 模态框弹起是的信息自动填充；            
        var jsonOld=JSON.parse(this.state.spanTitleEle.getAttribute('config'));console.log(11111,jsonOld);
        if(jsonOld!=null){
            console.log(2222222);
            for(var key in jsonOld){
                if('required,readonly,disabled,is_show'.indexOf(key)!=-1){
                    $('.'+key).find('input').attr('checked',jsonOld[key]?'checked':false);
                }else if('dataSource,valiDate,label,name'.indexOf(key)!=-1){
                    if(jsonOld[key])$('.'+key).find('input').val(jsonOld[key]);
                }else{
                    $('.'+key).find('input').each((k2,v2)=>{
                        if(jsonOld[key][k2])v2.value=jsonOld[key][k2];
                    });                        
                }                    
            }
        }else{
            console.log(33333333,'huang');alert(888);
            // 如果modal处于隐藏状态，所以他的元素对象找不到；
            $('.attr td input[type="checkbox"]').each((k,v)=>{
                console.log(v);
                v.checked='checked';
            });//attr('checked','checked');
            $('.attr td input[type="text"]').val('666');
            $('.attr td select option').eq(1).attr('selected','selected');
        }           
    }
    render() {
      return (
        <div>
            <Modal
                title="组件属性配置"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <table className='attr' style={{width:'100%',paddingTop:30}}>
                    <tbody>
                        <tr>
                            <td className='required' style={{display:this.state.params.required?'inline-block':'none',textIndent:65}}>
                                是否必填:   <input style={{verticalAlign:'middle'}} type='checkbox' name='attr' />
                            </td>
                            <td className='readonly' style={{display:this.state.params.readonly?'inline-block':'none',textIndent:65}}>
                                是否只读:   <input style={{verticalAlign:'middle'}} type='checkbox' name='attr'  />
                            </td>
                        </tr>
                        <tr >
                            <td className='is_show' style={{display:this.state.params.is_show?'inline-block':'none',textIndent:65}}>
                                是否显示:    <input style={{verticalAlign:'middle'}} type='checkbox' name='attr' />
                            </td>
                            <td className='disabled' style={{display:this.state.params.disabled?'inline-block':'none',textIndent:65}}>
                                可否点击:   <input style={{verticalAlign:'middle'}} type='checkbox' name='attr' />
                            </td>										
                        </tr>
                        <tr>
                            <td className='dataSource'  colSpan='2' style={{display:this.state.params.dataSource?'block':'none',padding:'10px 0px'}}>
                                引用: <Input style={{width:300}} placeholder='输入地址' />
                            </td>
                        </tr>								
                        <tr>
                            <td className='valiDate'  colSpan='2' style={{display:this.state.params.valiDate?'block':'none',padding:'10px 0px'}}>
                                过滤: <Input style={{width:300}} placeholder='验证规则' />
                            </td>
                        </tr>	
                        <tr>
                            <td className='label'  colSpan='2' style={{display:this.state.params.label?'block':'none',padding:'10px 0px'}}>
                                名称: <Input style={{width:300}} placeholder='输入组件名' />
                            </td>
                        </tr>								
                        <tr>
                            <td className='name'  colSpan='2' style={{display:this.state.params.name?'block':'none',padding:'10px 0px'}}>
                                字段: <Select 
                                    showSearch
                                    style={{ width:300 }}
                                    placeholder="选择字段"
                                    optionFilterProp="children"
                                    onChange={(v)=>{this.selectVal=v;}}
                                    onFocus={selectFocus}
                                    onBlur={selectBlur}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    <Option value={1}>1</Option>
                                    <Option value={2}>2</Option>
                                    <Option value={3}>3</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td className='config'  colSpan='2' style={{display:this.state.params.config?'block':'none',padding:'10px 0px'}}>
                                配置：
                                    <input type='text' style={{width:70}} name='attr' placeholder='item' />
                                    <input type='text' style={{width:70}} name='attr' placeholder='item' />
                                    <input type='text' style={{width:70}} name='attr' placeholder='item' />
                                    <input type='text' style={{width:70}} name='attr' placeholder='item' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        </div>
        );
    }
}
class OutComp extends Component{
    constructor(props){
        super(props);
        this.params=props.params
        this.state={
            close:false
        }
    }    
    close(){
        this.setState({
            close:true
        });
    }
    showModal(e){
        Drag_this.setState({
            modalFlag:Drag_this.showFlag?false:true,
            modalParams:Drag_this.attribute[$(e.target).parent().attr('class').substr(10)],
            spanTitleEle:e.target
        });
    }
    render(){        
        var element=
            <div className={this.params.params.className} draggable={this.params.dragStart?true:false} onDragStart={this.params.dragStart?this.params.dragStart:''} style={this.params.params.style?this.params.params.style:{}}>                                                    
                <span className='spanTitle' style={this.params.params.spanTitleStyle?this.params.params.spanTitleStyle:{}} onClick={this.showModal}>{this.params.params.text}</span>
                {this.params.params.Comp}
                <span className='closeSpan' style={{display:this.params.dragStart?'none':'block'}} onClick={this.close.bind(this)}>x</span>
            </div>;
        return (
            this.state.close?null:element
        )
    }
}
class OutRow extends Component{
    constructor(props){
        super(props);
        this.state=({
            params:props.params
        });        
    } 
    gridChange(val){
        var params=this.state.params;
        params.span=val.split(' ');
        this.setState({
            params
        });
    }
    render(){        
        return (
            <div className='component row'>
                <Row draggable="true" onDragStart={this.state.params.dragStart}>
                    {
                        this.state.params.span.map((item,key)=>{
                            return (
                                //<Col key={++key} span={item} ></Col>
                                <Col key={++key} span={item} >{key==1?<Input placeholder='动态改变栅格' style={{width:'90%',margin:4,fontSize:10}} onPressEnter={(e)=>{this.gridChange(e.target.value)}}/>:''}</Col>
                            )
                        })
                    }                    
                </Row>
            </div>    
        )
    }
}
class OutRow_right extends Component{
    constructor(props){
        super(props);
        this.params=props.params;
        var comps=[];
        this.params.forEach(()=>{
            comps.push([]);
        });
        this.state={
            comps,
            close:false,
            currentEle:''
        };        
    }     
    dragOver(e){
        e.nativeEvent.stopImmediatePropagation();
        e.nativeEvent.preventDefault();
    }   
    componentDidUpdate(){        
        var currentEle=$(this.state.currentEle);
        //console.log('componentDidUpdate',currentEle.parent().height(),currentEle.height(),currentEle.children().height());
        if(currentEle.children().height()+20>currentEle.siblings().not('.closeSpan').height()){
            currentEle.parent().children().not('.closeSpan').height(currentEle.children().height()+20);
        }            
    }
    dragDrop(e,key2){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var comps=this.state.comps;
        if(globalParams.CompFlag=='Row'){
            comps[key2].push(<OutRow_right key={++key} params={globalParams.params} />);   
        }else{
            comps[key2].push(<OutComp key={++key} params={{params:globalParams.params}} />);
        }             
        this.setState({
            comps,
            currentEle:e.target
        });
        //console.log('dragDrop',$(e.target).parent().height(),$(e.target).height());
    } 
    close(){
        this.setState({
            close:true
        });
    } 
    render(){ 
        var element=                   
            <Row>
                {
                    this.params.map((item,key)=>{
                        return (
                            <Col key={key} span={item} onDragOver={this.dragOver} onDrop={(e)=>{this.dragDrop(e,key)}} >{this.state.comps[key]}</Col>
                        )
                    })
                }
                <span className='closeSpan' onClick={this.close.bind(this)}>x</span>                    
            </Row>
        return (      
            this.state.close?null:element
        )
    }
}
var Drag_this='';
class Drag extends Component{
    constructor(){
        super();
        this.state={
            // 模态框状态以及参数配置          
            modalFlag:false,
            modalParams:[],
            // 记录当前点击的span标签对象
            spanTitleEle:'',

            // 表单预览
            leftSpan:6,
            // 右边容器的元素数组
            dragEle:[]
        }
        // dragOver事件高亮显示对象  
        this.dragOverEle='',
        this.count=0;
        this.attribute={  // 'span','type', 'label','name','required','readonly','disabled','is_show','dataSource','valiDate','config'
            input:['label','name','required','readonly','is_show','valiDate'],
            textarea:['label','name','required'],
            select:['label','name','required','readonly','dataSource'],
            date:['label','name','required','readonly'],
            selectTree:['label','name','required','dataSource'],
            cascader:['label','name','required','dataSource'],
            cascader_x:['label','name','required','dataSource'],            
            // radio:['label','name','required','config'],
            // checkbox:['label','name','required','config'],
            radio:['label','name','required'],
            checkbox:['label','name','required'],
            upload:['label','name','required','dataSource'],
            button:['label','disabled','dataSource'],
            reset:['label'],
            title:['label']
        }                            
        this.CompParams={
            title:{params:{Comp:<Title2 />,className:'component title',text:'案件标题 ：'},dragStart:()=>{this.dragStart(this.CompParams.title.params,'Comp')}},
            input:{params:{Comp:<Input2 />,className:'component input',text:'案件描述 ：'},dragStart:()=>{this.dragStart(this.CompParams.input.params,'Comp')}},
            textarea:{params:{Comp:<Textarea2 />,className:'component textarea',text:'详细描述 ：',spanTitleStyle:{position:'relative',top:-30}},dragStart:()=>{this.dragStart(this.CompParams.textarea.params,'Comp')}},
            select:{params:{Comp:<Select2 />,className:'component select',text:'下拉选框 ：'},dragStart:()=>{this.dragStart(this.CompParams.select.params,'Comp')}},
            upload:{params:{Comp:<Upload2 />,className:'component upload',text:'案件资料 ：'},dragStart:()=>{this.dragStart(this.CompParams.upload.params,'Comp')}},
            cascader:{params:{Comp:<Cascader2 />,className:'component cascader',text:'下拉级联 ：'},dragStart:()=>{this.dragStart(this.CompParams.cascader.params,'Comp')}},
            date:{params:{Comp:<DatePicker2 />,className:'component date',text:'上报日期 ：'},dragStart:()=>{this.dragStart(this.CompParams.date.params,'Comp')}},
            cascader_x:{params:{Comp:<Cascader_x2 />,className:'component cascader_x',text:'级联选择 ：',style:{height:160,textAlign:'left'},spanTitleStyle:{verticalAlign:'top'}},dragStart:()=>{this.dragStart(this.CompParams.cascader_x.params,'Comp')}},
            selectTree:{params:{Comp:<Tree2 />,className:'component selectTree',text:'下拉选择 ：',spanTitleStyle:{verticalAlign:'top'}},dragStart:()=>{this.dragStart(this.CompParams.selectTree.params,'Comp')}},
            checkbox:{params:{Comp:<Checkbox2 />,className:'component checkbox',text:'多项选择 ：'},dragStart:()=>{this.dragStart(this.CompParams.checkbox.params,'Comp')}},
            radio:{params:{Comp:<Radio2 />,className:'component radio',text:'单项选择 ：'},dragStart:()=>{this.dragStart(this.CompParams.radio.params,'Comp')}}
        }
        this.RowParams={
            row1:{span:[24],dragStart:()=>{this.dragStart(this.RowParams.row1.span,'Row')}},
            row2:{span:[12,12],dragStart:()=>{this.dragStart(this.RowParams.row2.span,'Row')}},
            row3:{span:[8,8,8],dragStart:()=>{this.dragStart(this.RowParams.row3.span,'Row')}},
            row4:{span:[16,8],dragStart:()=>{this.dragStart(this.RowParams.row4.span,'Row')}}
        }    
        this.searchData={
            title:'表单标题 案件标题',input:'单行输入框 案件描述',textarea:'多行输入框 详细描述',select:'下拉选框 下拉选框',
            upload:'附件上传 案件资料',cascader:'下拉级联 下拉级联',date:'日历组件 上报日期',cascader_x:'级联平铺 级联选择',
            selectTree:'下拉树 下拉选择',checkbox:'多选框 多项选择',radio:'单选框 单项选择'
        };
    }
    componentDidMount(){  
        Drag_this=this;
    }
    dragStart=(params,type)=>{ 
        globalParams={
            CompFlag:type=='Comp'?'Comp':'Row',
            params
        }
    }
    dragOver(e){     
        e.nativeEvent.stopImmediatePropagation();
        e.nativeEvent.preventDefault();
        if(e.target==this.dragOverEle){
            return false;
        }else{
            if(this.dragOverEle!=''){
                $(this.dragOverEle).removeClass('dragOverActive');
            }            
            this.dragOverEle=e.target;   
            $(this.dragOverEle).addClass('dragOverActive');
        }
    }    
    dragDrop(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();        
        var dragEle=this.state.dragEle;
        if(globalParams.CompFlag=='Row'){
            dragEle.push(<OutRow_right key={++key} params={globalParams.params} />);   
        }else{
            dragEle.push(<OutComp key={++key} params={{params:globalParams.params}} />);
        }             
        this.setState({
            dragEle
        });
    }
    btnSubmit(){
        console.log($('.right .component'));
        var json=[];
        for(var a=0;a<$('.right .component').length;a++){
            var row=[];
            //debugger
            var v=$('.right .component')[a];
            //var className=v.getAttribute('class');console.log(className,$(v).parent().parent());
            row.push({
                col:{
                    span:$(v).parent().attr('class').split('-')[2],
                    component:[
                        {
                            name:v.getAttribute('class').split(' ')[1],
                            config:$(v).find('.spanTitle').attr('config')
                        }
                    ]
                }
            });
            $(v).parent().siblings().not('span').each((k2,v2)=>{    //console.log(k2);
                ++a;
                var ele=$('.right .component')[a];
                row.push({
                    col:{
                        span:$(v2).attr('class').split('-')[2],
                        component:[
                            {
                                name:$(ele).attr('class').split(' ')[1],
                                config:$(ele).find('.spanTitle').attr('config')
                            }
                        ]
                    }
                });
                //row.push({col:$(v2).attr('class'),config:$(v2).find('.spanTitle').attr('config')});                
            });
            json.push(row);           
        }
        console.log(JSON.stringify(json));
    }
    search(val){
        if(!val)return ;
        for(var key in this.searchData){
            if(this.searchData[key].indexOf(val)!=-1){            
                var top=$('.left .'+key).offset().top-120;
                if(top<0)top=-top-120;
                var currentTop=$('.left').scrollTop(),step=parseInt((top-currentTop)/20);
                console.log(top,currentTop,step);
                var timer=setInterval(function(){
                    currentTop+=step;
                    $('.left').scrollTop(currentTop);
                    if(currentTop-top>=-Math.abs(step)/2 && currentTop-top<=Math.abs(step)/2){
                        clearInterval(timer);
                        //$('.left').scrollTop($('.left .'+key).position().top);
                        $('.left .'+key).css('border-color','#f00');
                        setTimeout(function(){
                            $('.left .'+key).css('border-color','#aaa');
                        },2000);
                    }
                    console.log(top,currentTop,step);
                },20);
                return ;
            }
            console.log(key);
        }
        
    }
    //
    modalOk(){
        this.setState({
            modalFlag:false
        });
    }
    modalCancel(){
        this.setState({
            modalFlag:false
        });
    }
    showModal(ele){
        alert(888888);
        console.log(ele);
    }
    formPreShow(){
        var currentSpan=this.state.leftSpan;
        this.setState({
            leftSpan:currentSpan==6?0:6
        });  
        if(currentSpan==6){
            $('.right .ant-row>div').css({
                borderRightWidth:0,
                borderBottomWidth:0 
            });  
            $('.closeSpan').css('width',0);    
            $('.right .title .spanTitle').css('display','none');
            $(this.dragOverEle).removeClass('dragOverActive');
        }else{
            $('.right .ant-row>div').css({
                borderRightWidth:1,
                borderBottomWidth:1 
            });      
            $('.closeSpan').css('width','20px');    
            $('.right .title .spanTitle').css('display','inline-block');
            $(this.dragOverEle).addClass('dragOverActive');
        }        
    }    
    render(){
        return (
            <div>
                <Row style={{height:60,background:'#107eb5',marginBottom:0}}>   
                    <Col span={24}>
                        <h3 style={{textIndent:20,color:'#fff',letterSpacing:3,fontSize:30}} >表单图形化设计器 <span style={{background:'rgba(255,255,255,.15)',padding:5,borderRadius:3,fontSize:10,letterSpacing:1}}>buildForm v1.0</span></h3>     
                    </Col>
                </Row>                
                <Row>
                    <Col span={this.state.leftSpan} className='left' style={{height:window.innerHeight-60}}>
                        <Affix>
                            <Search
                                placeholder="组件模糊搜索"
                                onSearch={this.search.bind(this)}
                                style={{ width: '90%',display:'block',height:32,margin:'10px auto'}}
                                enterButton
                            />
                        </Affix>            
                        <h2 style={{textAlign:'center',margin:'10px 0px 0px 0px',height:25}}>纵横布局</h2>
                        <p>单行布局</p>
                        <OutRow params={this.RowParams.row1} />                         
                        <p>等分布局</p>
                        <OutRow params={this.RowParams.row2} />                       
                        <p>三等分布局</p>
                        <OutRow params={this.RowParams.row3} />                        
                        <p>1 vs 2 布局</p>
                        <OutRow params={this.RowParams.row4} /> 
                                           
                        <h2 style={{textAlign:'center',marginTop:20}}>组件布局</h2> 
                        <p>表单标题</p>  
                        <OutComp params={this.CompParams.title} ></OutComp>  
                        <p>单行输入框</p>
                        <OutComp params={this.CompParams.input} ></OutComp>
                        <p>日历组件</p>    
                        <OutComp params={this.CompParams.date} ></OutComp>  
                        <p>多行输入框</p>  
                        <OutComp params={this.CompParams.textarea} ></OutComp> 
                        <p>下拉选框</p>
                        <OutComp params={this.CompParams.select} ></OutComp>
                        <p>附件上传</p>
                        <OutComp params={this.CompParams.upload} ></OutComp>
                        <p>下拉级联</p>
                        <OutComp params={this.CompParams.cascader} ></OutComp>                        
                        <p>级联平铺</p>                            
                        <div style={{position:'relative',height:170}}>   
                            <OutComp params={this.CompParams.cascader_x} ></OutComp>                         
                        </div>
                        <p>下拉树</p>    
                        <div style={{position:'relative',height:110}}>
                            <OutComp params={this.CompParams.selectTree} ></OutComp>                         
                        </div>
                        <p style={{position:'relative',display:'block'}}>多选框</p>    
                        <OutComp params={this.CompParams.checkbox} ></OutComp>
                        <p>单选框</p>    
                        <OutComp params={this.CompParams.radio} ></OutComp>                                    
                    </Col>
                    <Col className='right' span={24-this.state.leftSpan}>
                        <div className='container' style={{width:'100%',height:window.innerHeight-120,border:'1px solid #bbb'}} onDragOver={this.dragOver.bind(this)} onDrop={this.dragDrop.bind(this)}>
                           {this.state.dragEle}
                        </div>
                        <div>
                            <Button type={this.state.leftSpan==6?'primary':'default'} size='large' style={{width:130,float:'right',height:30,marginRight:50,marginTop:20}} onClick={this.formPreShow.bind(this)}>
                                {
                                    this.state.leftSpan==6?<span><Icon type="scan" /> 表单预览</span>:<span><Icon type="edit" /> 继续编辑</span>
                                }
                            </Button>
                            <Button type="primary" size='large' style={{width:130,float:'right',height:30,marginRight:50,marginTop:20}} onClick={this.btnSubmit.bind(this)}>
                                <Icon type="check" />提交表单
                            </Button>
                        </div>
                        <Modal2 showFlag={this.state.modalFlag} params={this.state.modalParams} spanTitleEle={this.state.spanTitleEle} modalOk={this.modalOk.bind(this)} modalCancel={this.modalCancel.bind(this)} /> 
                    </Col>                                       
                </Row>                
            </div>
        );
    }
}
ReactDom.render(<Drag />,root);
