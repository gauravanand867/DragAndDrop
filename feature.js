const colors=["#93a3b9", "#b4c7e7","#2f5597","#548235", "#c5e0b4","#f6d865","#c12524", "#e96429","#bfbfbf"];

document.addEventListener('DOMContentLoaded', (event) => {

    var dragSrcEl = null;
    
    function handleDragStart(e) {
      this.style.opacity = '0.4';      
      dragSrcEl = this;  
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.id);
    }
  
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }  
      e.dataTransfer.dropEffect = 'move';      
      return false;
    }
  
    function handleDragEnter(e) {
      this.classList.add('over');
    }
  
    function handleDragLeave(e) {
      this.classList.remove('over');
    }
  
    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation(); // stops  redirecting.
      }
      
      if (dragSrcEl != this) {
        let text1=dragSrcEl.innerText,text2=this.innerText;
        dragSrcEl.innerText = text2;
        let id1 = e.dataTransfer.getData('text/html'), id2=this.id;
        let idNo1=Number(id1.substr(-1)), idNo2=Number(id2.substr(-1));
        this.innerText=text1;
        document.getElementById(id1).style.backgroundColor=document.getElementById(id2).style.backgroundColor;
        document.getElementById(id2).style.backgroundColor=colors[idNo1];

        var temp=colors[idNo1];
        colors[idNo1]=colors[idNo2];
        colors[idNo2]=temp;
      }
      
      return false;
    }
  
    function handleDragEnd(e) {
      this.style.opacity = '1';
      
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
    
    let items = document.querySelectorAll('.container .box');
    for(var i=0;i<items.length;i++){
      var item=items[i];
      var id="cell"+i;
      item.id=id;
      document.getElementById(id).style.backgroundColor=colors[i];
    };
    items.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragenter', handleDragEnter, false);
      item.addEventListener('dragover', handleDragOver, false);
      item.addEventListener('dragleave', handleDragLeave, false);
      item.addEventListener('drop', handleDrop, false);
      item.addEventListener('dragend', handleDragEnd, false);
    });
  });