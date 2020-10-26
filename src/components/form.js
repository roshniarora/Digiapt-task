import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";

import { TextField, Divider } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import "./form.css"


function FormTitle() {

    const [select, setSelect] = useState("short")
    const [newCheckbox, setnewCheckbox] = useState("")
    const [tagCollection, setTagCollection] = useState([])
    const [radioCollection, setRadioCollection] = useState([])
    const [newRadio, setnewRadio] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (tagCollection.length === 5) {
            return null
        }

        setTagCollection([...tagCollection, { value: newCheckbox ? newCheckbox : "", label: newCheckbox ? newCheckbox : "" }])
        setnewCheckbox('')
    }

    const handelRadioSubmit = (e) => {
        e.preventDefault()
        if (radioCollection.length === 5) return null

        setRadioCollection([...radioCollection, { type: "radio", value: newRadio }]);
    }

    // console.log(tagCollection)
    return (
        <div className='form_container'>
            <Formik
                initialValues={{
                    title: "Contact Information",
                    description: "",
                    text: "",
                    question: "",
                    answer: "",
                    tags: '',

                }}>

                {({ values }) => (

                    <Form>
                        <div className="form-title">

                            <div className='input_container'>
                                <Divider orientation='vertical' varient='fullWidth' />

                                <Field name="title" placeholder=" Form title" as={TextField} /> <br />
                                <Field name="description" as={TextField} placeholder="Form description" />

                            </div>

                            <div className='input_container'>
                                <label className="question_container">Question</label>
                                <Field name="text" placeholder="Show answer text" as={TextField} /> <br />
                            </div>

                            <div className='input_container'>
                                <label className="second_container">Form Title Entered</label>
                                <br />
                                <h3>Form description entered</h3>
                            </div>

                            <div className="input_container" >
                                <div className='select_container'>
                                    <Select
                                        // labelId="demo-simple-select-helper-label"
                                        // id="demo-simple-select-helper"
                                        value={select}
                                        onChange={(e) => setSelect(e.target.value)}
                                    >
                                        <MenuItem value={"short"}>Short answer</MenuItem>
                                        <MenuItem value={"mcq"}>Multiple Choice</MenuItem>
                                        <MenuItem value={"check"}>Checkboxes</MenuItem>

                                    </Select>
                                </div>
                                <div className=''>
                                    {select === 'short' ? <div> <Field name="question" placeholder="Question entered" as={TextField} /> <br />
                                        <Field name="answer" as={TextField} placeholder="Short answer text" /> </div> : null}
                                </div>
                                <div className=''>
                                    {
                                        select === 'check' ? <div>
                                            <div>
                                                <div className="field_box"> <Field name="question" placeholder="Question entered" as={TextField} /> </div>

                                                <FieldArray
                                                    name="tags"
                                                    render={arrayHelpers => (
                                                        <div className="checkbox">
                                                            {tagCollection?.map(tag => (
                                                                <label key={tag.value}>
                                                                    <input
                                                                        name="tags"
                                                                        type="checkbox"
                                                                        value={tag}
                                                                        checked={values.tags.includes(tag.value)}
                                                                        onChange={e => {
                                                                            if (e.target.checked) {
                                                                                arrayHelpers.push(tag.value);
                                                                            } else {
                                                                                const idx = values.tags.indexOf(tag.value);
                                                                                arrayHelpers.remove(idx);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span>{tag.label}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    )}
                                                />
                                                {tagCollection.length === 5 ? null : <form handleSubmit={handleSubmit}>
                                                    <input
                                                        name="values"
                                                        type="text"
                                                        value={newCheckbox}
                                                        onChange={(e) => setnewCheckbox(e.target.value)} />
                                                    <button htmlType="submit" onClick={handleSubmit} >Add option</button>
                                                </form>}
                                            </div>
                                        </div> : null
                                    }
                                </div>

                                <div>
                                    {
                                        select === "mcq" ? <div>


                                            <div>
                                                <div className="field_box"> <Field name="question" placeholder="Question entered" as={TextField} /> </div>
                                                {radioCollection.map(ele => <div><input type="radio" name='Multiple choice' value={ele} /> <label>{ele.value}</label> </div>)}
                                                {radioCollection.length === 5 ? null : <div><input
                                                    type="text"
                                                    name="Multiple choice"
                                                    placeholder="write something"
                                                    onChange={(e) => setnewRadio(e.target.value)} />

                                                    <button Type="submit" onClick={handelRadioSubmit} >Add option</button></div>}
                                            </div>
                                        </div> : null
                                    }
                                </div>
                            </div>

                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default FormTitle