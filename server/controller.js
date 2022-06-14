/** @controller = controller001 **/
const mongoose = require('mongoose')
const Student = mongoose.model('Student')
const ObjectId = mongoose.Types.ObjectId

const getStudents = async (req, res) => {
    let student = req.params.payload ? JSON.parse(req.params.payload) : null
    if (student) {
        Student.find({ _id: ObjectId(student.id) }, { _id: 0, firstName: 1, lastName: 1, admissionId: 1 }, (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Error in retrieving students list :' + err)
            }
        })
    }
    else {
        Student.find((err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Error in retrieving students list :' + err)
            }
        })
    }
}

const saveStudent = async (req, res) => {
    try {
        var student = new Student()
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName
        student.admissionId = req.body.admissionId
        let data = await student.save()
        return res.status(200).send({ message: "Student added successfully!" });
    } catch (err) {
        console.log("error" + err)
    }
}

const updateStudent = async (req, res) => {
    try {
        let student = JSON.parse(req.params.payload)
        Student.findOneAndUpdate({ _id: ObjectId(student.id) }, req.body, (err, doc) => {
            if (!err) {
                res.send('Student Updated Successfully!')
            } else {
                console.log('Error in employee delete :' + err)
            }
        })
    }
    catch (err) {
        console.log(error)
    }
}

const deleteStudent = async (req, res) => {
    let studentId = JSON.parse(req.params.payload)
    console.log(typeof (studentId.id))
    Student.findOneAndDelete({ _id: ObjectId(studentId.id) }, (err, doc) => {
        if (!err) {
            res.send('Student deleted successfully!')
        } else {
            console.log('Error in student delete :' + err)
        }
    });
}

module.exports = {
    getStudents,
    saveStudent,
    deleteStudent,
    updateStudent
}