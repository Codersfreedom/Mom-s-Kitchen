import { Button, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, TagLabel, Textarea } from "@chakra-ui/react"
import { Save } from "lucide-react"
import { useState } from "react"


const PostRecipeForm = () => {

  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    prepTime: "",
    prepTimeUnit: "",
    cookTime: "",
    cookTimeUnit: "",
    ingredients: [],
    directions: [],
    visability: "",
  })



  const handleChange = (e) => {
    const field = e.target.name;
    setRecipeData(values => ({ ...values, [field]: e.target.value }));

  }
  const handleImageChange = (e) => {
    const image = e.target.files[0];

    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setRecipeData({ ...recipeData, image: reader.result })
      }
      reader.readAsDataURL(image);

    }
  }

  const handleInputArray = (e, field) => {

    const value = e.target.value.split(",");

    setRecipeData((prevData) => ({
      ...prevData,
      [field]: value
    }))

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(recipeData)
  }


  return (
    <div className="min-h-screen w-full flex justify-center ">

      <form className="h-full w-full flex flex-col gap-5 p-4 lg:w-1/2 " onSubmit={handleSubmit}>


        <Input placeholder="Recipe Title" name="title" required value={recipeData.title} onChange={handleChange} />
        <Textarea placeholder="Recipe Description" name="description" onChange={handleChange} required />
        <Select variant={'filled'} required name="category" onChange={handleChange} >
          <option value='Breakfast' >Breakfast</option>
          <option value='Lunch'>Lunch</option>
          <option value='Dinner'>Dinner</option>
          <option value='Dessert'>Dessert</option>
          <option value='Main Dish'>Main Dish</option>
          <option value='Salad'>Salad</option>
          <option value='Snacks'>Snacks</option>
          <option value='Side Dish'>Side Dish</option>
          <option value='Soups'>Soups</option>
        </Select>

        <FormLabel>Uploade Recipe Image:</FormLabel>
        <Input type="file" accept="image/*" onChange={handleImageChange} required />

        <FormLabel>Preparation Time:</FormLabel>
        <div className="flex gap-2">
          <NumberInput required  >
            <NumberInputField value={recipeData.prepTime} name="prepTime" onChange={handleChange} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>


          <Select variant={'filled'} required value={recipeData.prepTimeUnit} name="prepTimeUnit" onChange={handleChange} >
            <option value='hours'>Hours</option>
            <option value='minutes'>Minutes</option>
            <option value='days'>Days</option>
          </Select>


        </div>

        <FormLabel>Cook Time:</FormLabel>
        <div className="flex gap-2">
          <NumberInput required>
            <NumberInputField name="cookTime" value={recipeData.cookTime} onChange={handleChange} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>


          <Select variant={'filled'} name="cookTimeUnit" value={recipeData.cookTimeUnit} onChange={handleChange} >
            <option value='hours'>Hours</option>
            <option value='minutes'>Minutes</option>
            <option value='days'>Days</option>
          </Select>


        </div>

        <FormLabel >Ingredients: </FormLabel>

        <Textarea placeholder="Ex:1 tsp Pepper" required value={recipeData.ingredients.join(',')} onChange={(e) => handleInputArray(e, 'ingredients')} />

        <FormLabel >Directions: </FormLabel>
        <Textarea placeholder="Ex:Place all ingredients in blender" value={recipeData.directions} onChange={(e) => handleInputArray(e, 'directions')} required />

        <FormLabel >Save this recipe as: </FormLabel>
        <RadioGroup defaultValue='public' >
          <Stack spacing={5} direction='row'>
            <Radio colorScheme='green' value='public' onChange={(e) => setRecipeData({ ...recipeData, visability: 'public' })} >
              Public
            </Radio>
            <Radio colorScheme='red' value='private' onChange={(e) => setRecipeData({ ...recipeData, visability: 'private' })}>
              Private
            </Radio>
          </Stack>
        </RadioGroup>

        <Button
          type="submit"
          leftIcon={<Save />}
          colorScheme="yellow"
        >SAVE</Button>
      </form>

    </div>
  )
}

export default PostRecipeForm
