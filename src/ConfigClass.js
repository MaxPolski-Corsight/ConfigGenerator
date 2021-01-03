class ConfigNode{
    constructor(key,data,parent,level){
        this.key = key;
        this.data = data;
        this.level = level;
        this.type = Array.isArray(this.data) ? 'array' : typeof this.data; 
        this.parent = parent;
        this.children = null;
    }
    get getParent(){
        return this.parent;
    }
    set setData(data){
        this.data = data;
    }
    
    set setChildren(nodes){
        this.children = nodes;
    }
}


function TreeBuilder([key,value],parent,level){
    if(value != null){
        if(typeof value !='object' || Array.isArray(value)){
            const node = new ConfigNode(key,value,parent,level)
            return node;
        }else{
            const node = new ConfigNode(key,null,parent,level);
            const children = Object.entries(value).map(i =>{
                return TreeBuilder(i,node,level+1)
            })
            node.setChildren = children;
            return node;
        }
    } else {
        const node = new ConfigNode(key,'', parent,level)
        return node;
    }
}


export default  function testConfig(config){
    const root = TreeBuilder(['SC config',config],null,0)
    console.log(root);
    return root;
}

