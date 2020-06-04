export function getfromstorage(key)
{
    if(!key)
    return null;
    try{
        const value=localStorage.getItem(key);
        console.log(value);
        if(value)
        {           
            return JSON.parse(value);
            
          
        }
        return null;
    }
    catch(err)
    {
        return null;
    }
}

export function setinstorage(key,obj)
{
    if(!key)
    {
        console.error('Error:key is missing');
    }
    try{
        localStorage.setItem(key,JSON.stringify(obj));
    }
    catch(err)
    {
        console.error(err);
    }
}