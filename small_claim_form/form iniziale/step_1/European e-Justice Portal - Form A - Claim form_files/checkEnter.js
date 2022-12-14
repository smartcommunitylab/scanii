function checkEnter(e) 
{
    var evt  = (e) ? e : ((event) ? event : null);
    
    if(evt.keyCode == 13)
    {
    	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    	var nodeType = node.type;
    	var nodeName = node.name;
      
    	if( (nodeName) && (nodeName == "simpleSearchText") )
		{
			return true;
		}
    	else if( (nodeType) && (nodeType == "textarea") )
    	{
    		return true;
    	}
		else if(nodeTypeBlockingVal(nodeType))
	    {
	        return false;
	    }
	    else
	    {
	        return false;
	    }
    }
}

function nodeTypeBlockingVal(nodeType) {
	return nodeType ? (nodeType == "text")
			|| (nodeType.indexOf("select") != -1) || (nodeType == "checkbox")
			|| (nodeType == "radio") : false;
}