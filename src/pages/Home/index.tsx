import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos.').max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

// interface NewCycleFormData {
//   task: string,
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData){

  }

  const task = watch('task');
  const isSubmitDisable = !task;

  return (
      <HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)}>
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput id="task" list="task-suggestions" placeholder="Dê um nome para seu projeto" {...register('task')}/>

        <datalist id="task-suggestions">
          <option value="Projeto 1" />
          <option value="Projeto 2" />
          <option value="Projeto 3" />
          <option value="Maçã" />
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} {...register('minutesAmount')}/>

        <span>minutos.</span>
      </FormContainer>

      <CountDownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountDownContainer>

      <StartCountDownButton disabled={isSubmitDisable} type="submit">
        <Play size={24} />
        Começar
      </StartCountDownButton>
    </form>
  </HomeContainer>
  )
}