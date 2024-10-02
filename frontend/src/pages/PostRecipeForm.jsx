import { Button, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, TagLabel, Textarea } from "@chakra-ui/react"
import { Save } from "lucide-react"


const PostRecipeForm = () => {
  return (
    <div className="min-h-screen w-full flex justify-center ">

      <form className="h-full w-full flex flex-col gap-5 p-4 lg:w-1/2 ">


        <Input placeholder="Recipe Title" required />
        <Textarea placeholder="Recipe Description" required />
        <Select variant={'filled'} required >
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
        <Input type="file" accept="jpg" required />

        <FormLabel>Preparation Time:</FormLabel>
        <div className="flex gap-2">
          <NumberInput required>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>


          <Select variant={'filled'} required>
            <option value='option1'>Hours</option>
            <option value='option2'>Minutes</option>
            <option value='option3'>Days</option>
          </Select>


        </div>

        <FormLabel>Cook Time:</FormLabel>
        <div className="flex gap-2">
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>


          <Select placeholder='Select option' variant={'filled'}>
            <option value='option1'>Hours</option>
            <option value='option2'>Minutes</option>
            <option value='option3'>Days</option>
          </Select>


        </div>
        <FormLabel>Serves:</FormLabel>
        <NumberInput required>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormLabel >Ingredients: </FormLabel>

        <Textarea placeholder="Ex:1 tsp Pepper" required />

        <FormLabel >Directions: </FormLabel>
        <Textarea placeholder="Ex:Place all ingredients in blender" required />

        <FormLabel >Save this recipe as: </FormLabel>
        <RadioGroup defaultValue='public'>
          <Stack spacing={5} direction='row'>
            <Radio colorScheme='green' value='public'>
              Public
            </Radio>
            <Radio colorScheme='red' value='private'>
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
