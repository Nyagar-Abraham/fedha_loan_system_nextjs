'use client'

import React from 'react'
import {loanTypeInterface} from '@/lib/Interfaces'
import Image from 'next/image';

const Loan = ({loan}:{loan:loanTypeInterface}) => {

  console.log(loan);
  return (
    <li className='text-orange20 border border-orange10/30 rounded-sm px-3 py-5 flex flex-col gap-4 relative hover:border-orange40/30 hover:scale-[1.01] duration-300'>
     {loan.value === 'Development' && <p className='absolute left-2 top-0 -translate-y-1/2 font-semibold uppercase tracking-wide py-1 px-3 rounded-full bg-orange80 '>reccommended</p>}

      <div className='flex-between'>
        <div>
          <p className='font-bold text-[1.2rem]'> <span className=''>{loan.repaymentPeriod}</span> year {loan.category}</p>
          <p className='text-[0.8rem] text-orange10/60'>{loan.bank}</p>
        </div>
        <Image
         src={loan.logo.src}
         alt={loan.category + "logo"}
         className='aspect-square object-cover rounded-sm hover:scale-[1.01] hover:opacity-60 duration-300'
         width={50}
         height={50}
        />
      </div>

      <div className='grid grid-cols-2 gap-4 p-2 rounded-sm border border-orange10/10'>
          <div className='flex flex-col '>
             <p className='capitalize text-[0.8rem] text-orange10/60'>max amount</p>
             <p className='font-bold'>{loan.maximumAmount}</p>
          </div>
          <div className='flex flex-col '>
             <p className='capitalize text-[0.8rem] text-orange10/60'>monthly installement </p>
             <p className='font-bold'>{loan.monthlyInstallement}</p>
          </div>
          <div className='flex flex-col '>
             <p className='capitalize text-[0.8rem] text-orange10/60'>Rate</p>
             <p className='font-bold'>{(loan.interestRate * 100).toFixed(2)}%</p>
          </div>
          <div className='flex flex-col '>
             <p className='capitalize text-[0.8rem] text-orange10/60'>Duration</p>
             <p className='font-bold'>{loan.repaymentPeriod} {loan.repaymentPeriod === 1  ?'year' :'years'}</p>
          </div>
      </div>
      </li>
  )
}

export default Loan