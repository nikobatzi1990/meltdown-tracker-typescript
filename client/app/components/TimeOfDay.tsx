import { useState, ChangeEvent } from "react";
import Input from "./Input";

interface TimeOfDayProps {
  onChange: React.ChangeEventHandler,
  timeOfDay: string
}

export default function TimeOfDay({ onChange, timeOfDay }: TimeOfDayProps) {

  return (
    <>
      <p>Time of Day</p>
      
      <Input 
        id='morning'
        name='time-of-day'
        text='Morning'
        type='radio'
        value='morning'
        onChange={onChange}
        checked={timeOfDay === 'morning'}
      />
      <Input 
        id='afternoon'
        name='time-of-day'
        text='Afternoon'
        type='radio'
        value='afternoon' 
        onChange={onChange}
        checked={timeOfDay === 'afternoon'}
      />
      <Input 
        id='evening'
        name='time-of-day'
        text='Evening'
        type='radio'
        value='evening' 
        onChange={onChange}
        checked={timeOfDay === 'evening'}
      />
      <Input 
        id='night'
        name='time-of-day'
        text='Night'
        type='radio'
        value='night' 
        onChange={onChange}
        checked={timeOfDay === 'night'}
      />
    </>
  );
}