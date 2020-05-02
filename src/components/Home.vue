<template>
    <div class="mt-5 p-5">
        <mdb-container fluid grid-list-xl>
            <mdb-row>
                <mdb-col col="9">
                    <h1>Home</h1>
                </mdb-col>
                <mdb-col col="3"></mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import {
    mdbContainer,
    mdbRow,
    mdbCol,
} from "mdbvue";

export default {
  name: 'home',
  components: {
      mdbContainer,
      mdbRow,
      mdbCol,
  }
}

</script>