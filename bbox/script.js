(function() {
    'use strict';

    // svg 오브젝트를 d3로 select
    var svg = d3.select('#svg');

    // group을 의미하는 g 태그
    // 하위에 속한 태그들을 그룹별로 관리할 때 쓰인다.
    var g = svg.append('g');

    /**
     * d3-zoomer를 이용하여 해당 g 태그 하위의 요소들을 확대, 축소
     * @see https://github.com/kimxogus/d3-zoomer
     */
    g.call(d3.zoomer());

    // d3를 이용하여 data 에 정의된 노드 별로 1개씩 node 클래스를 갖는 g 태그를 생성한다.
    var node = g.selectAll('.node')
        .data(data)
        .enter()
        .append('g')            // 여기서 각각의 g 태그 생성, 아래에서 g 태그의 속성을 정의한다.
        .classed('node', true)  // class 정의 여부
        .attr('transform', function (d) {    // transform attribute 값 설정. 각 데이터 값마다 함수를 실행하여 리턴된 값을 대입한다.
            // 예시) d => { name: 'NODE1', x: 200, y: 100 }
            return 'translate(' + [d.x, d.y] + ')'; // g 태그가 x, y 값 만큼 이동한다.
        });

    var rect = node.append('rect')  // 각각의 노드 안에 사각형 모양을 만들어 준다.
        .attr('rx', 5)
        .attr('ry', 5); // 사각형 모서리를 둥글게

    var text = node.append('text')  // 노드에 라벨을 넣어준다.
        .text(function (d) {
            return d.name;  // 데이터 내 name property.
        })
        .each(function () {
            // this 객체는 현재 자기 자신의 DOM객체 ( 여기서는 text Element )

            var bbox = this.getBBox();  // get bounding box 함수, 객체의 현재 x, y, width, height값을 리턴

            d3.select(this)     // text 요소의 기준점을 중앙으로 위치한다.
                .attr('x', - bbox.width / 2)
                .attr('y', bbox.height / 2);

            var rect = d3.select(this.parentNode).select('rect');   // 같은 노드 그룹 내의 rect

            var textMargin = 10;

            // 라벨의 크기를 기준으로 rect의 위치, 너비, 높이를 조정
            rect
                .attr('x', bbox.x - bbox.width / 2 - textMargin)
                .attr('y', bbox.y + bbox.height / 2 - textMargin)
                .attr('width', bbox.width + textMargin * 2)
                .attr('height', bbox.height + textMargin * 2);
        });

    // 노드가 제대로 위치하였는지 확인
    var centerCircle = node.append('circle')
        .attr('r', 3)
        .attr('fill', 'red')
        .attr('cx', 0)
        .attr('cy', 0);
})();