# Language
    ES6
        classes
        arrow functions
        spread
            map
            filter
        deconstruct
        let/const

# React
    Component
        Functional
        Classes
            State  ==> redux
            Life cycle
                componentWillMount
                componentWillReceiveProps
                    based on paraent data change, props may change

                shouldComponentUpdate
                    
            Ref??

        PropsTypes 
            propTypes
            defaultProps

        Immutable
            compare data

            O(n) - Computation
            Memory - 1 objects/update 2 objects

            Render() {
             for/table 10000   [40000 objects created]
                <div> 
                    <span>
                        <em>{title}
            }   
                T1 - to create Virtual dom
                T2 - compare/diff virtual dom
                T3 - Patching the differences
                T4 - GC to track and clean objects


    To create new component

    Creation

    Update
    Destruction