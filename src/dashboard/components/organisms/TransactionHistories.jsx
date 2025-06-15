import React from 'react'
import ListContainer from '../molecules/ListContainer'
import { BiChevronsRight } from 'react-icons/bi';

export default function TransactionHistories({ data, title ,type = 'expense'}) {
    return (
        <div className="bg-white px-6 py-5 mt-6 shadow-md rounded-2xl w-full mx-auto">  
            <h1 className="text-2xl text-center font-bold text-blue-900/70 mb-4">{title}</h1>
            <div className="flex flex-col gap-1 mt-2 border-t-2 border-blue-900/20 w-full rounded-md inset-shadow-sm inset-shadow-blue-950/10">
                {Array.isArray(data) && data.length > 0 ? (
                    <>
                        {data.map((item, index) => (
                            <ListContainer
                                key={item.id}
                                index={index + 1}
                                className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
                                OnDelete={() => console.log('Delete', item.id)}
                            >
                                <div className="grid grid-cols-2">
                                    <div className="flex p-0 items-center gap-10">
                                        <h1 className="text-lg font-bold text-blue-900/60">{type === 'expense' ? item.expenseDate: item.incomeDate}</h1>
                                        <div>
                                            <h3 className="text-lg font-bold text-blue-900/60">{type === 'expense' ? item.reason : item.source}</h3>
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
                    </>
                ) : (
                    <div className="text-center text-blue-900/50 py-6 font-medium">
                        Kosong
                    </div>
                )}
            </div>
        </div>
    );
}
