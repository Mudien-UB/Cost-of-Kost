import React from 'react'
import ListContainer from '../molecules/ListContainer'
import {  BiChevronsRight } from 'react-icons/bi';



export default function TransactionHistories({data}) {
    return (
        <div className="bg-white px-6 py-5 mt-6 shadow-md rounded-2xl w-full mx-auto">  
            <h1 className="text-2xl text-center font-bold text-blue-900/70 mb-4">Pengeluaran Hari ini</h1>
            <div className="flex flex-col gap-1 mt-2 border-t-2 border-blue-900/20 w-full rounded-md inset-shadow-sm inset-shadow-blue-950/10">
                {data.map((item, index) => (
                    <ListContainer
                        key={index}
                        index={index + 1}
                        className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
                        OnEdit={() => console.log('Edit', item.id)}
                        OnDelete={() => console.log('Delete', item.id)}
                    >
                        <div className="grid grid-cols-2">
                            <div className="flex p-0 items-center gap-10">
                                <h1 className="text-lg font-bold text-blue-900/60">{item.expenseDate}</h1>
                                <div>
                                    <h3 className="text-lg font-bold text-blue-900/60">{item.reason}</h3>
                                    <p className="text-sm font-bold text-blue-900/50">{item.categoryName}</p>
                                </div>  
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <h1 className="text-lg font-bold text-blue-900/60">
                                    {`Rp ${item.amount.toLocaleString('id-ID')}`}
                                </h1>
                            </div>
                        </div>
                    </ListContainer>
                ))}
                <div className="w-full flex items-center justify-between p-2 gap-2 hover:bg-blue-50 transition-colors rounded-md cursor-pointer">
                    <span className="text-lg font-bold text-blue-900/45 flex items-center gap-1">
                        Lihat lebih banyak
                        <BiChevronsRight size={20} />
                    </span>
                </div>

            </div>
        </div>
    );
}
