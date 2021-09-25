import React from 'react';

function StudentList(props) {
    return (
        <ul className="student-list">
            {props.students &&
                props.students.filter(item => item.display)
                    .map((item) =>
                        <li className="card" key={item.id}>
                            <img className="card__pic" src={item.pic} alt={`${item.firstName} ${item.lastName}`} />
                            <ul className="card__details-container">
                                <li className="card__name">
                                    {item.firstName} {item.lastName}
                                    <button className="card__toggle-btn" onClick={(e) => props.onClick(e, item.id)}>
                                        {/**change the svg display of the toggle button by removing the vertical line */}
                                        {item.gradesDisplay ?
                                            <svg className="toggle-svg" width='24' height='24' stroke="#797979" strokeWidth="5" strokeLinecap="round" overflow='visible'>
                                                <line x1="00" y1="12" x2="24" y2="12" />
                                            </svg>
                                            :
                                            <svg className="toggle-svg" width='24' height='24' stroke="#797979" strokeWidth="5" strokeLinecap="round" overflow='visible'>
                                                <line x1="00" y1="12" x2="24" y2="12" />
                                                <line x1="12" y1="24" x2="12" y2="0" />
                                            </svg>}
                                    </button>
                                </li>
                                <li className="card__detail">Email: {item.email} </li>
                                <li className="card__detail">Company: {item.company}</li>
                                <li className="card__detail">Skill: {item.skill}</li>
                                <li className="card__detail">Average: {average(item.grades)}%</li>
                                <ul className="card__detail__grades">
                                    {item.gradesDisplay && item.grades.map((item, i) => <li className="card__detail" key={i}>Test {i + 1}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item}%</li>)}
                                </ul>
                                <ul className="card__detail__tag-list">
                                    {item.tag && item.tag.map((item, i) => <li className="card__detail__tag" key={i}>{item}</li>)}
                                </ul>
                                <input autoComplete="off" type="text" className="card__tag__input" name="tagInput" placeholder="Add a tag" onKeyDown={(e) => props.addTag(e, item.id)} />

                            </ul>

                        </li>)}
        </ul>

    );
}


//turn an array of string of numbers into an array of numbers and find out the average
function average(grades) {
    return grades.map(item => Number(item)).reduce((a, b) => a + b) / grades.length;
}


export default StudentList;