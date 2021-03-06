import { isEnter } from '../../../utils.js';
import {  addAnswer } from '../API.js';
const { Card, CardContent, TextField, Icon, IconButton } = MaterialUI;
const e = React.createElement;

export default function Help(props) {
    const answer = props.type == 'image' ? e("img", {src: props.answer, style: { maxHeight: "50%", maxWidth: "50%", marginLeft: "25%", marginRight: "25%"}}) : props.answer;

    const onValued = () => {
        const points = document.getElementById("valuation" + props.id).value;
        document.getElementById("valuation" + props.id).value = "";
        if(!points || points == 'e') {
            alert("Insert points correctly"); 
            return;
        }        
	const player = props.player;
        const story = props.story;
        const array = props.arrayEvaluations[player];
        const tmp = _.cloneDeep(props.arrayEvaluations);
        array.forEach((item, index) => {
            if(item.props.id == props.id)
                tmp[player].splice(index, 1)
        })
        props.setArrayEvaluations(tmp);
        (async () => {
            await addAnswer(story, player, points, props.section);
            props.socket.emit('read-message', { type: "evaluation", player, story, points, id: props.id });
        })();
    }
    
    return(
        e(Card, {style: {backgroundColor: "#a1aba4", marginBottom: 20}}, [
            (CardContent, null, [
                e("b", null, `Section ${props.section}`), e("br"), e("b", null, `Question: `), props.question,
                e("div", {style: {height: "auto", width: "80%"}}, [ e("b", null, `Answer: `), e("br"), answer ]),
                e(TextField, {onKeyDown: () => {isEnter(event)? onValued() : null}, type: "number", id: "valuation" + props.id, variant: "outlined", style: {width: "80%", marginBottom: 20, marginLeft: 18}, InputProps: {endAdornment:
                    e(IconButton, {onClick: onValued, key: "4", children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
                )
            ])
        ])
    );
}
//e("div", {style: {backgroundColor: "#3f51b5", minHeight: 60, width: "80%", border: "1px solid grey"}}, [