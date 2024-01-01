import React, { useEffect, useState, useRef } from 'react'
import { getAllCategories, saveCategory, deleteCategoryApi } from '../../services/category_service';
import Input from '../../components/reusedComponents/Input'
import Button from '../../components/reusedComponents/Button';
import { useNavigate } from 'react-router-dom';
import './CategoryStyle.css'
import Table from '../../components/reusedComponents/Table'

const Category = () => {
  const ref = useRef();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [categoryExists, setCategoryExists] = useState(true);
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteObj, setDeleteCategory] = useState('')

  useEffect(() => {
    console.log(ref)
    apiCall()
  }, [])

  const apiCall = () => {
    getAllCategories().then((response) => {
      setCategories(response.data)
      console.log(response.data)
      if (response.data == []) {
        setCategoryExists(false)
      }
    }, (error) => {
      console.log(error.response)
    })
  }

  const saveCategoryForm = (e) => {
    e.preventDefault();
    setCategory({
      ...category.categoryType = category.categoryType.toUpperCase()
    })
    saveCategory(category).then((resp) => {
      console.log('Successfully added the category')
      alert('Successfully added the category')
      apiCall()
      toggleModal()
    }, (error) => {
      alert(error.response.data)
      console.log('Some unexpected error occurred')
    })
  }

  const handleChange = (event, property) => {
    setCategory({ ...category, [property]: event.target.value })
  }

  const deleteCategory = (item) => {
    deleteCategoryApi(item).then((response) => {
      console.log(response.data);
      alert(response.data);
      apiCall()
    }, (error) => {
      console.log(error)
    })
    apiCall();
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  const addcatmodal = () => {
    setModal(!modal)
  }

  const deletecatModal = (item) => {
    setDeleteCategory(item)
    setDeleteModal(!deleteModal)
  }

  const viewdeletemodal = () => {
    setDeleteModal(!deleteModal)
  }

  const finalDeleteCategory = () => {
    deleteCategory(deleteObj)
    setDeleteModal(!deleteModal)
  }

  const columns = ['Category', 'Limit', 'Action']

  return (
    <div className='categoryContainer'>
      <h3>List of categories -</h3>
      <div className="cat-container">
        <div className="top">
          <Button className='add-btn' name="Add category" color="purple" click={addcatmodal}></Button>
        </div>
      </div>
      <div className='category'>
        {modal &&
          <div className="category-container" ref={ref}>
            <form onSubmit={saveCategoryForm} className='categoryForm'>
              <div className="category-form-control">
                <div>
                  <h4>Category Type *</h4>
                  <div>
                    <Input type="text" placeholder="Fill category type" changes={(e) => handleChange(e, "categoryType")} required={'required'} />
                  </div>
                </div>
                <div>
                  <h4>Category Limit *</h4>
                  <div>
                    <Input type="text" placeholder="Fill limit in rupees" changes={(e) => handleChange(e, "categoryLimit")} required={'required'} />
                  </div>
                </div>
              </div>
              <div className='form-btn'>
                <Button name="Save" type="submit" ></Button>
                <Button name="Close" ml={'5px'} color={'red'} click={addcatmodal}></Button>
              </div>

            </form>
          </div>
        }

        {deleteModal &&
          <div className="category-container" ref={ref}>
            <form className='deleteForm'>
              <div className="category-form-control">
                <p>Are you sure you want to delete the item</p>
              </div>
              <div className='form-btn'>
                <Button name="Delete" type="submit" color="red" click={finalDeleteCategory}></Button>
                <Button name="Close" ml={'5px'} click={viewdeletemodal}></Button>
              </div>

            </form>
          </div>
        }

        {categoryExists &&
          <Table columns={columns} data={categories.map((category) => ({
            'Category': category.categoryType,
            'Limit': category.categoryLimit,
            'Action': <>
              <Button className='delete-btn' name="Delete" color="black" click={() => { deletecatModal(category.categoryType) }}>Delete</Button>
            </>
          }))} />
        }
      </div>

    </div>
  )
}

export default Category