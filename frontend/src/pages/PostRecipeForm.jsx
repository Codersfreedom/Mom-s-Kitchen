import { Button, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, TagLabel, Textarea } from "@chakra-ui/react"
import { Save } from "lucide-react"


const PostRecipeForm = () => {
  return (
    <div className="min-h-screen w-full flex justify-center ">
      <div className="h-full w-full flex flex-col gap-5 p-4 lg:w-1/2 ">
        <Input placeholder="Recipe Title" />
        <Textarea placeholder="Recipe Description" />
        <Select variant={'filled'}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>

        <FormLabel>Preparation Time:</FormLabel>
        <div className="flex gap-2">
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>


          <Select variant={'filled'}>
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
        <NumberInput>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormLabel >Ingredients: </FormLabel>

        <Textarea placeholder="Ex:1 tsp Pepper" />

        <FormLabel >Directions: </FormLabel>
        <Textarea placeholder="Ex:Place all ingredients in blender" />

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
          leftIcon={<Save />}
          colorScheme="yellow"
        >SAVE</Button>
      </div>
    </div>
  )
}

export default PostRecipeForm
