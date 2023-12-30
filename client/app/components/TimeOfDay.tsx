import Input from "./Input";

export default function TimeOfDay() {
  return (
    <>
      <p>Time of Day</p>
      
      <Input 
        id='morning'
        name='time-of-day'
        text='Morning'
        type='radio'
        value='morning' 
      />
      <Input 
        id='afternoon'
        name='time-of-day'
        text='Afternoon'
        type='radio'
        value='afternoon' 
      />
      <Input 
        id='evening'
        name='time-of-day'
        text='Evening'
        type='radio'
        value='evening' 
      />
      <Input 
        id='night'
        name='time-of-day'
        text='Night'
        type='radio'
        value='night' 
      />
    </>
  );
}