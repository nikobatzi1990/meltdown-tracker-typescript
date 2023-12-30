import Input from "./Input";

export default function Intensity() {
  return (
    <>
      <p>Meltdown Intensity</p>
      <Input 
        id='intensity_one'
        name='intensity'
        text='1'
        type='radio'
        value='1' 
      />
      <Input 
        id='intensity_two'
        name='intensity'
        text='2'
        type='radio'
        value='2' 
      />
      <Input 
        id='intensity_three'
        name='intensity'
        text='3'
        type='radio'
        value='3' 
      />
      <Input 
        id='intensity_four'
        name='intensity'
        text='4'
        type='radio'
        value='4' 
      />
      <Input 
        id='intensity_five'
        name='intensity'
        text='5'
        type='radio'
        value='5' 
      />
    </>
  );
}