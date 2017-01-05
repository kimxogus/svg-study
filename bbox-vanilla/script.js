(function() {
  'use strict';

  var textMargin = 10;

  var svg = document.querySelector('#svg');

  data.forEach(function (d) {
    // node group
    var node = document.createElementNS('http://www.w3.org/2000/svg', 'g');     // namespace를 이용하여 생성하여야 svg오브젝트를 얻을 수있음!
    node.className.baseVal = 'node';
    node.setAttribute('transform', 'translate(' + [d.x, d.y] + ')');    // node 그룹의 기준 좌표 설정

    svg.appendChild(node);

    // node label
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = d.name;

    // 여기서 getBBox를 호출할 경우, text.getBBox() => { x:0, y:0, width:0, height:0 }

    node.appendChild(text); // 여기서 렌더링이 이뤄지므로 렌더링 한 이후에 getBBox를 호출해야함!

    var bbox = text.getBBox();

    // text의 x, y 좌표
    text.setAttribute('x', - bbox.width / 2);
    text.setAttribute('y', bbox.height / 2);

    // node rect
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('rx', 5);
    rect.setAttribute('ry', 5);
    node.insertBefore(rect, text);

    // rect의 x, y 좌표 및 크기 설정
    rect.setAttribute('x', bbox.x - bbox.width / 2 - textMargin);
    rect.setAttribute('y', bbox.y + bbox.height / 2 - textMargin);
    rect.setAttribute('width', bbox.width + textMargin * 2);
    rect.setAttribute('height', bbox.height + textMargin * 2);

    // 중앙 위치 확인용 circle
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    circle.setAttribute('r', 3);
    circle.setAttribute('fill', 'red');

    // 중심점의 x, y좌표
    circle.setAttribute('cx', 0);
    circle.setAttribute('cy', 0);

    node.appendChild(circle);

    return node;
  });
})();