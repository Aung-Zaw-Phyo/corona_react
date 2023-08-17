import React from "react";
import Item from './Item'

const Discount = (props) => {
    const discounts = props.data.data
    return (
        <>
            {
                discounts.length > 0 && (
                    <div className="container py-16 ">
                        <div className="grid md:grid-cols-2 gap-6 m-0 p-0">
                            {
                                discounts.map(discount => {
                                    return discount.products.map(product => (
                                        <Item  key={discount.id + '' + product.id} discount={discount} product={product} />
                                    ))
                                })
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Discount;
