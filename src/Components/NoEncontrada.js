function NoEncontrada() {
    return (
      <>    
      <div class="shadow-2xl grow flex justify-center m-8">
      <section class="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
	<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div class="max-w-md text-center">
			<h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span class="sr-only">Error</span>404
			</h2>
			<p class="text-2xl font-semibold md:text-3xl">Lo sentimos no hemos podido encontrar la pagina</p>
			<p class="mt-4 mb-8 dark:text-gray-400">Puedes volver al menu principal</p>
			<a rel="noopener noreferrer" href="/" class="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Volver al menu principal</a>
		</div>
	</div>
</section>
      </div>
      </>      
    );
  }
  
export default NoEncontrada;