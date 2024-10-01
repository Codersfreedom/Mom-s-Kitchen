import { Menu, IconButton, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Button } from '@chakra-ui/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
const AddRecipeBtn = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Menu closeOnSelect={true}>
            <MenuButton
                className='fixed right-4 lg:bottom-12 bottom-[95px]   '
            >  
            <IconButton 
                icon={<Plus/>}
                isRound={true}
                colorScheme={'teal'}
                size={'lg'}
                
            />
            </MenuButton>
            <MenuList minWidth='240px'>
                
                <MenuOptionGroup  type='checkbox'>
                    <MenuItemOption value='phone'><Link to={'/post'}>Post Recipe</Link> </MenuItemOption>
                    <MenuItemOption value='phone'><Link to={'/post'}>Post Recipe</Link> </MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default AddRecipeBtn
