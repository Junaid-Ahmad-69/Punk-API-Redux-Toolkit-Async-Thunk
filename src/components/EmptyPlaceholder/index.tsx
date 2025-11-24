const EmptyPlaceholder = ({name, url, content}: {name: string, url: string, content?: string}) => {
    return (
        <>
            <img src={url} alt={name} />
            <div className=" mt-5 text-center">
                <h3 className='font-semibold text-2xl'>{content || 'No Beer Found!'}</h3>
            </div>
        </>
    )
}
export default EmptyPlaceholder;